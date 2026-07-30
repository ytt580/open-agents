import { NextRequest, NextResponse } from 'next/server'
import { readFile, writeFile, readdir, stat } from 'fs/promises'
import { join, resolve } from 'path'

const ALLOWED_DIRECTORIES = [
  join(process.env.HOME || process.env.USERPROFILE || '', 'Documents'),
  join(process.env.HOME || process.env.USERPROFILE || '', 'Desktop'),
  join(process.env.HOME || process.env.USERPROFILE || '', 'Downloads'),
]

function isPathAllowed(filePath: string): boolean {
  const resolved = resolve(filePath)
  return ALLOWED_DIRECTORIES.some(dir => resolved.startsWith(dir))
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { action, path: filePath, content, newPath } = body

    if (!action || !filePath) {
      return NextResponse.json(
        { error: 'action and path are required' },
        { status: 400 }
      )
    }

    if (!isPathAllowed(filePath)) {
      return NextResponse.json(
        { error: 'Acesso negado: diretorio nao permitido. Apenas Documents, Desktop e Downloads sao permitidos.' },
        { status: 403 }
      )
    }

    switch (action) {
      case 'read': {
        const data = await readFile(filePath, 'utf-8')
        return NextResponse.json({ content: data, path: filePath })
      }

      case 'write': {
        if (!content && content !== '') {
          return NextResponse.json(
            { error: 'content is required for write action' },
            { status: 400 }
          )
        }
        await writeFile(filePath, content, 'utf-8')
        return NextResponse.json({ success: true, path: filePath, message: 'Arquivo salvo com sucesso' })
      }

      case 'list': {
        const items = await readdir(filePath)
        const details = await Promise.all(
          items.map(async (item) => {
            const itemPath = join(filePath, item)
            const stats = await stat(itemPath)
            return {
              name: item,
              path: itemPath,
              isDirectory: stats.isDirectory(),
              size: stats.size,
              modified: stats.mtime
            }
          })
        )
        return NextResponse.json({ items: details, path: filePath })
      }

      case 'exists': {
        try {
          await stat(filePath)
          return NextResponse.json({ exists: true, path: filePath })
        } catch {
          return NextResponse.json({ exists: false, path: filePath })
        }
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action. Use: read, write, list, exists' },
          { status: 400 }
        )
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido'
    console.error('File API error:', message)
    return NextResponse.json(
      { error: message },
      { status: 500 }
    )
  }
}

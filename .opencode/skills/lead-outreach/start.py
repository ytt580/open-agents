#!/usr/bin/env python3
"""
Lead Outreach - Início Rápido
Execute: python start.py
"""

import os
import sys

def main():
    print("=" * 60)
    print("🎯 LEAD OUTREACH - Automação de Geração de Leads")
    print("=" * 60)
    print()
    
    # Verificar dependências
    print("📦 Verificando dependências...")
    
    try:
        import playwright
        print("✅ Playwright instalado")
    except ImportError:
        print("❌ Playwright não encontrado. Instalando...")
        os.system("pip install playwright")
        os.system("playwright install chromium")
    
    print()
    print("📋 OPÇÕES:")
    print()
    print("1. 🔍 Buscar leads no Google Maps")
    print("2. 🌐 Scraping de site específico")
    print("3. 🎨 Criar site melhorado")
    print("4. 📨 Enviar proposta via WhatsApp")
    print("5. 🤖 Orquestração completa (tudo automático)")
    print("6. ⚙️  Configurar (PIX, mensagens, etc)")
    print("0. ❌ Sair")
    print()
    
    opcao = input("Escolha uma opção: ").strip()
    
    if opcao == "1":
        buscar_leads()
    elif opcao == "2":
        scraping()
    elif opcao == "3":
        criar_site()
    elif opcao == "4":
        enviar_proposta()
    elif opcao == "5":
        orquestrar()
    elif opcao == "6":
        configurar()
    elif opcao == "0":
        print("👋 Até logo!")
        sys.exit(0)
    else:
        print("❌ Opção inválida")


def buscar_leads():
    print("\n🔍 BUSCAR LEADS NO GOOGLE MAPS")
    print("-" * 40)
    
    criterio = input("Critério (ex: lojas com site feio nota 5): ").strip()
    local = input("Local (ex: São Paulo): ").strip() or "Brasil"
    
    print(f"\n🔍 Buscando: {critério} em {local}...")
    
    # Aqui seria a chamada real para o Playwright
    print("⚠️  Execute o script: python scripts/buscar_leads.py")
    print(f"    Critério: {criterio}")
    print(f"    Local: {local}")


def scraping():
    print("\n🌐 SCRAPING DE SITE")
    print("-" * 40)
    
    url = input("URL do site: ").strip()
    
    print(f"\n🌐 Fazendo scraping: {url}...")
    print("⚠️  Execute o script: python scripts/scraping_site.py")


def criar_site():
    print("\n🎨 CRIAR SITE MELHORADO")
    print("-" * 40)
    
    print("⚠️  Execute o script: python scripts/criar_site.py")


def enviar_proposta():
    print("\n📨 ENVIAR PROPOSTA VIA WHATSAPP")
    print("-" * 40)
    
    telefone = input("Telefone (ex: 11999999999): ").strip()
    nome = input("Nome do negócio: ").strip()
    
    print(f"\n📨 Enviando proposta para {nome} ({telefone})...")
    print("⚠️  Execute o script: python scripts/enviar_proposta.py")


def orquestrar():
    print("\n🤖 ORQUESTRAÇÃO COMPLETA")
    print("-" * 40)
    
    criterio = input("Critério de busca: ").strip()
    local = input("Local: ").strip() or "Brasil"
    pix = input("Seu PIX: ").strip()
    
    print(f"\n🚀 Iniciando orquestração...")
    print(f"    Critério: {criterio}")
    print(f"    Local: {local}")
    print(f"    PIX: {pix}")
    print()
    print("⚠️  Execute o script: python scripts/orquestrador.py")


def configurar():
    print("\n⚙️  CONFIGURAR")
    print("-" * 40)
    
    print("1. Configurar PIX")
    print("2. Configurar mensagens")
    print("3. Configurar WhatsApp")
    print("4. Configurar Instagram")
    
    opcao = input("Escolha: ").strip()
    
    if opcao == "1":
        pix = input("Seu PIX: ").strip()
        print(f"✅ PIX configurado: {pix}")
    elif opcao == "2":
        print("📝 Edite o arquivo: scripts/templates_mensagens.py")
    elif opcao == "3":
        print("📱 Abra https://web.whatsapp.com e escaneie o QR Code")
    elif opcao == "4":
        print("📷 Faça login no Instagram manualmente")


if __name__ == "__main__":
    main()

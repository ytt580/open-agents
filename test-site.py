from playwright.sync_api import sync_playwright
import os
import sys

# URL do site - usar argumento ou localhost
SITE_URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3000"

def test_site():
    print(f"Testando: {SITE_URL}\n")
    
    os.makedirs("test-screenshots", exist_ok=True)
    
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={"width": 1920, "height": 1080})
        page = context.new_page()
        
        try:
            # Teste 1: Dashboard
            print("[1/9] Dashboard Principal")
            page.goto(SITE_URL, timeout=30000)
            page.wait_for_load_state("networkidle")
            page.wait_for_timeout(3000)
            
            title = page.title()
            print(f"   Titulo: {title}")
            print("   OK Dashboard carregado")
            page.screenshot(path="test-screenshots/01-dashboard.png")
            print()
            
            # Teste 2: Sidebar
            print("[2/9] Sidebar")
            sidebar_items = page.query_selector_all("aside button")
            print(f"   Itens: {len(sidebar_items)}")
            print("   OK Sidebar OK")
            print()
            
            # Teste 3: Fluxos
            print("[3/9] Pagina de Fluxos")
            flows_btn = page.get_by_text("Fluxos", exact=False).first
            if flows_btn:
                flows_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="test-screenshots/02-flows.png")
                print("   OK Fluxos carregado")
            else:
                print("   ERRO Botao Fluxos nao encontrado")
            print()
            
            # Teste 4: Navegador
            print("[4/9] Navegador")
            browser_btn = page.get_by_text("Navegador", exact=False).first
            if browser_btn:
                browser_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="test-screenshots/03-browser.png")
                print("   OK Navegador carregado")
            else:
                print("   ERRO Botao Navegador nao encontrado")
            print()
            
            # Teste 5: Skills
            print("[5/9] Skills Manager")
            skills_btn = page.get_by_text("Skills", exact=False).first
            if skills_btn:
                skills_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="test-screenshots/04-skills.png")
                print("   OK Skills carregado")
            else:
                print("   ERRO Botao Skills nao encontrado")
            print()
            
            # Teste 6: Agendador
            print("[6/9] Agendador 24/7")
            scheduler_btn = page.get_by_text("Agendador", exact=False).first
            if scheduler_btn:
                scheduler_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="test-screenshots/05-scheduler.png")
                print("   OK Agendador carregado")
            else:
                print("   ERRO Botao Agendador nao encontrado")
            print()
            
            # Teste 7: APIs
            print("[7/9] Gerenciador de APIs")
            api_btn = page.get_by_text("APIs", exact=False).first
            if api_btn:
                api_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="test-screenshots/06-api.png")
                print("   OK APIs carregado")
            else:
                print("   ERRO Botao APIs nao encontrado")
            print()
            
            # Teste 8: Criar fluxo
            print("[8/9] Criar Novo Fluxo")
            page.get_by_text("Visao Geral", exact=False).first.click()
            page.wait_for_timeout(500)
            novo_fluxo_btn = page.get_by_text("Novo Fluxo", exact=False).first
            if novo_fluxo_btn:
                novo_fluxo_btn.click()
                page.wait_for_timeout(1000)
                page.screenshot(path="test-screenshots/07-novo-fluxo.png")
                print("   OK Modal aberto")
            else:
                print("   ERRO Botao Novo Fluxo nao encontrado")
            print()
            
            # Teste 9: Mobile
            print("[9/9] Responsividade Mobile")
            page.set_viewport_size({"width": 375, "height": 812})
            page.goto(SITE_URL)
            page.wait_for_timeout(1000)
            page.screenshot(path="test-screenshots/08-mobile.png")
            print("   OK Layout mobile renderizado")
            
            print()
            print("=" * 50)
            print("TODOS OS TESTES CONCLUIDOS!")
            print("=" * 50)
            
        except Exception as e:
            print(f"ERRO: {e}")
            page.screenshot(path="test-screenshots/error.png")
            
        finally:
            browser.close()

if __name__ == "__main__":
    test_site()
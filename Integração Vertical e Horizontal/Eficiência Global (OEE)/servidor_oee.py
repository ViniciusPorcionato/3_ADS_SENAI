import asyncio
import websockets
import json
import random
from datetime import datetime

INTERVALO_COLETA = 5  # Reduzido para 5 segundos para testes. Mude para 300 em produção.
PEÇAS_POR_SEGUNDO_IDEAL = 0.2

# Conjunto para armazenar todos os dashboards conectados
DASHBOARDS_CONECTADOS = set()

async def ler_dados_mes():
    tempo_ativo = random.uniform(3, 5) # Simulação adaptada para ciclos de 5s
    pecas_totais = random.randint(0, 2)
    pecas_boas = max(0, pecas_totais - random.randint(0, 1))

    return {
        "Tempo_Ativo": tempo_ativo,
        "Peças_Totais": pecas_totais,
        "Peças_Boas": pecas_boas,
        "Tempo_Planejado": INTERVALO_COLETA
    }

def calcular_indicadores(dados):
    disponibilidade = dados["Tempo_Ativo"] / dados["Tempo_Planejado"]
    
    taxa_producao_real = dados["Peças_Totais"] / dados["Tempo_Ativo"] if dados["Tempo_Ativo"] > 0 else 0
    performance = taxa_producao_real / PEÇAS_POR_SEGUNDO_IDEAL
    performance = min(performance, 1.0)
    
    qualidade = dados["Peças_Boas"] / dados["Peças_Totais"] if dados["Peças_Totais"] > 0 else 0
    oee = disponibilidade * performance * qualidade

    return {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "Indicadores": {
            "Disponibilidade": round(disponibilidade * 100, 1),
            "Performance": round(performance * 100, 1),
            "Qualidade": round(qualidade * 100, 1),
            "OEE_Global": round(oee * 100, 1)
        }
    }

async def registrar_dashboard(websocket):
    """Gerencia a conexão com o navegador"""
    DASHBOARDS_CONECTADOS.add(websocket)
    try:
        await websocket.wait_closed()
    finally:
        DASHBOARDS_CONECTADOS.remove(websocket)

async def motor_oee():
    """Calcula e envia os dados para quem estiver conectado"""
    while True:
        if DASHBOARDS_CONECTADOS:
            dados_brutos = await ler_dados_mes()
            relatorio = calcular_indicadores(dados_brutos)
            payload = json.dumps(relatorio)
            
            # Dispara o JSON para todos os navegadores abertos
            websockets.broadcast(DASHBOARDS_CONECTADOS, payload)
            print(f"[{relatorio['timestamp']}] OEE: {relatorio['Indicadores']['OEE_Global']}% transmitido.")
            
        await asyncio.sleep(INTERVALO_COLETA)

async def main():
    print("Servidor OEE iniciado! Abra o arquivo HTML no seu navegador...")
    # Inicia o servidor WebSocket na porta 8000
    async with websockets.serve(registrar_dashboard, "localhost", 8000):
        await motor_oee() # Roda o motor em paralelo

if __name__ == "__main__":
    asyncio.run(main())
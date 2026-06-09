import pymongo
import pandas as pd
from bson import ObjectId

def extrair_dados_mongo():

    uri = "mongodb+srv://<username>:<password>@seu-cluster.mongodb.net/?retryWrites=true&w=majority"
    client = pymongo.MongoClient(uri)

    db = client["name_db"]

    dados_usuarios = list(db["users"].find())
    dados_tarefas = list(db["tasks"].find())

    df_users = pd.DataFrame(dados_usuarios)
    df_tasks = pd.DataFrame(dados_tarefas)

    return df_users, df_tasks

def processar_relatorio(df_users, df_tasks):

    df_users = df_users.drop_duplicates(subset=['_id'])

    df_tasks = df_tasks.drop_duplicates(subset=['_id'])
    # Remover tarefas que não possuem vínculo com usuário
    df_tasks = df_tasks.dropna(subset=['userId'])
    
    # Garante que os campos de data sejam interpretados corretamente como datetime pelo Pandas
    df_tasks['data_criacao'] = pd.to_datetime(df_tasks['data_criacao'])
    df_tasks['data_conclusao'] = pd.to_datetime(df_tasks['data_conclusao'])
    
    # Calcula o tempo de conclusão em horas (pode alterar para dias, minutos, etc.)
    df_tasks['tempo_conclusao_horas'] = (df_tasks['data_conclusao'] - df_tasks['data_criacao']).dt.total_seconds() / 3600
    
    df_users['_id'] = df_users['_id'].astype(str)
    df_tasks['userId'] = df_tasks['userId'].astype(str)
    
    # Faz a junção das coleções com base no ID do usuário
    df_consolidado = pd.merge(df_tasks, df_users, left_on='userId', right_on='_id', suffixes=('_task', '_user'))
    
    # Agrupa por usuário e calcula as métricas de produtividade
    relatorio = df_consolidado.groupby(['userId', 'name']).agg(
        total_tarefas_concluidas=('tempo_conclusao_horas', 'count'),
        tempo_medio_conclusao_horas=('tempo_conclusao_horas', 'mean')
    ).reset_index()
    
    # Arredonda o tempo médio para duas casas decimais
    relatorio['tempo_medio_conclusao_horas'] = relatorio['tempo_medio_conclusao_horas'].round(2)
    
    return relatorio

def relatorio_csv(df_relatorio, file_name = 'script_sprintManager.csv'):
    df_relatorio.to_csv(file_name, index=False, sep=';', encoding='utf-8-sig')

if __name__ == "__main__":
    try:
        print("Iniciando extração do MongoDB...")
        df_u, df_t = extrair_dados_mongo()
        
        print("Realizando limpeza e processando métricas...")
        df_final = processar_relatorio(df_u, df_t)
        
        print("Exportando dados...")
        relatorio_csv(df_final)
        
    except Exception as e:
        print(f"Ocorreu um erro durante a execução: {e}")
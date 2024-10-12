import pandas as pd
import os
import json

# Rutas de los archivos
even_data_path = './event_data.csv'
csvs_data_path = './data/'

# Imprimir por consola todos los CSVs en la ruta especificada
csv_files = [f for f in os.listdir(csvs_data_path) if f.endswith('.csv')]

# Leer el archivo even_data.csv
even_data = pd.read_csv(even_data_path)

# Crear un diccionario para agrupar los datos
grouped_data = {}

for index, row in even_data.iterrows():
    filename = row["Filename"]
    
    if filename not in grouped_data:
        grouped_data[filename] = {
            "Filename": filename,
            "start": [],
            "end": []
        }
    
    grouped_data[filename]["start"].append(row["start"])
    grouped_data[filename]["end"].append(row["end"])

# Convertir el diccionario a una lista
data = list(grouped_data.values())

# Iterar sobre cada archivo CSV
for csv_file in csv_files:
    # Quitar la extensión .csv
    base_filename = os.path.splitext(csv_file)[0]
    
    # Buscar en los datos agrupados
    matched_data = next((item for item in data if item["Filename"] == base_filename), None)
    
    # Leer el archivo CSV
    file_path = os.path.join(csvs_data_path, csv_file)
    df = pd.read_csv(file_path)
    
    # Crear la estructura del JSON
    json_data = {
        "sismo_start": matched_data["start"] if matched_data else [],
        "sismo_end": matched_data["end"] if matched_data else [],
        "time": df["time_rel(sec)"].tolist(),
        "vel": df["velocity(m/s)"].tolist()
    }
    
    # Crear el archivo JSON
    json_filename = f"{base_filename}.json"
    with open(json_filename, 'w') as json_file:
        json.dump(json_data, json_file, indent=4)
    
    if matched_data:
        print(f"Archivo JSON creado: {json_filename}")
    else:
        print(f"No se encontraron datos de sismo para: {csv_file}. Se creó el JSON con listas vacías.")



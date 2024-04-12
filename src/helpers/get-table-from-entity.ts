import { Entity } from "@/types/strapi.type";

export function getColumnsAndDataSource(entities: Entity[]): { columns: any[], dataSource: any[] } {
    if (entities.length === 0) {
      return { columns: [], dataSource: [] };
    }
    
    // Obtener las propiedades únicas de los objetos Entity
    const allProperties = Object.keys(entities[0]);
  
    // Crear el objeto columns
    const columns: any[] = [];
    allProperties.forEach(prop => {
      if (prop !== 'id') {
        columns.push({
          title: prop.charAt(0).toUpperCase() + prop.slice(1), // Capitalizar la primera letra
          dataIndex: prop,
          key: prop
        });
      }
    });
  
    // Crear el objeto dataSource
    const dataSource = entities.map(entity => ({
      key: entity.id.toString(),
      ...Object.fromEntries(
        Object.entries(entity).filter(([key]) => key !== 'id')
      )
    }));
  
    return { columns, dataSource };
  }
export interface Pedido { id: number; fecha_hora: number; moso_id: number; cliente_id: number; mesa_id: number; };
export interface Moso { id: number; nombre: string; apellido: string; ventas_total: number; };
export interface Cliente { id: number; nombre: string; apellido: string; };
export interface Plato { id: number; descripcion: string; precio: number; disponibilidad: boolean; };
export interface Bebida { id: number; descripcion: string; precio: number; disponibilidad: boolean; };
export interface PedidoPlato { id: number; pedido_id: number; plato_id: number; };
export interface PedidoBebida { id: number; pedido_id: number; bebida_id: number; };
export interface Mesa { id: number; numero: string; capacidad: number; moso_id: number; };

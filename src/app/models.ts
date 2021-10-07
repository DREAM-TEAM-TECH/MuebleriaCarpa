export interface Proveedor
{
    id: string; 
    nombre: string;
    apellido: string;
    producto: string;
    estado: string;
    municipio: string;
    colonia: string;
    calle: string; 
    codigo_postal: number;
    num_exterior: number;
    telefono: number; 
    empresa: string; 
}

export interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    color: string;
    material: string;
    stock: number;
    description: string; 
    uploadDate: Date;
}

export interface Category {
    id: string;
    name: string;
    description: string;
}

export interface Color {
    id: string;
    color: string;
}

export interface Material {
    id: string;
    name: string;
    description: string;
}


export interface Empleado{
    
    nombre: string,
    apellido: string,
    email: string,
    sexo: string,
    fecha_nacimiento: string,
    id_categoria_empleado: string,
    id_estados: string,
    id_Municipios: string,
    id_colonia: string,
    calle: string,
    codigo_postal: string,
    numero_exterior: string,
    telefono: string
}

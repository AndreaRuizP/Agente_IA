# Agente_IA

## Caracteristicas del Agente

## Atención al cliente
Responder preguntas.
Mostrar menú.
Recomendar combos.
Informar precios.
Mostrar promociones.

## Gestión de pedidos
Tomar pedidos automáticamente.
Confirmar órdenes.
Calcular totales.
Enviar pedidos a cocina.
Actualizar estado del pedido.

## Inteligencia del negocio
Recomendar productos según hora o clima.
Detectar productos más vendidos.
Analizar ventas.
Generar estadísticas.

## Automatización
Integrarse con WhatsApp.
Integrarse con web.
Enviar notificaciones.
Reservar mesas.
Gestionar domicilios.

## Tecnologias a utilizar
Frontend: React
Backend: Django
API: Django REST
Base de datos: PostgreSQL
IA: OpenIA
Automatización: n8n

## Instalación e iniciación 

Frontend: React (JavaScript) + vite con tailwindcss

npm create vite@latest frontend
npm install tailwindcss @tailwindcss/vite
npm run dev

libreria: npm install react-router-dom axios

Backend: Django

python -m venv venv
venv\Scripts\activate
pip install django djangorestframework psycopg2-binary django-cors-headers
django-admin startproject config .
python manage.py startapp api
python manage.py runserver

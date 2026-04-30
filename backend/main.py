from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import Session, select
from typing import List
from database import engine, init_db, get_session
from models import Product, ProductCreate, ProductRead, Order, OrderCreate, OrderRead, OrderItem

app = FastAPI(title="Nova Commerce API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your frontend URL
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    init_db()

@app.get("/")
def read_root():
    return {"message": "Welcome to Nova Commerce API"}

# --- Products ---

@app.get("/products", response_model=List[ProductRead])
def read_products(session: Session = Depends(get_session)):
    products = session.exec(select(Product)).all()
    return products

@app.post("/products", response_model=ProductRead)
def create_product(product: ProductCreate, session: Session = Depends(get_session)):
    db_product = Product.model_validate(product)
    session.add(db_product)
    session.commit()
    session.refresh(db_product)
    return db_product

# --- Orders ---

@app.post("/orders", response_model=OrderRead)
def create_order(order_data: OrderCreate, session: Session = Depends(get_session)):
    # 1. Create the Order
    db_order = Order(
        customer_name=order_data.customer_name,
        customer_email=order_data.customer_email,
        total_price=order_data.total_price,
        status=order_data.status
    )
    session.add(db_order)
    session.commit()
    session.refresh(db_order)

    # 2. Create the Order Items
    for item in order_data.items:
        db_item = OrderItem(
            product_id=item.product_id,
            quantity=item.quantity,
            price=item.price,
            order_id=db_order.id
        )
        session.add(db_item)
    
    session.commit()
    session.refresh(db_order)
    return db_order

@app.get("/orders", response_model=List[OrderRead])
def read_orders(session: Session = Depends(get_session)):
    orders = session.exec(select(Order)).all()
    return orders

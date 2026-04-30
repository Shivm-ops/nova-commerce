from typing import Optional, List
from sqlmodel import Field, SQLModel, Relationship

class ProductBase(SQLModel):
    name: str = Field(index=True)
    description: str
    price: float
    category: str = Field(index=True)
    rating: float = 0.0
    reviews: int = 0
    image: str

class Product(ProductBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)

class ProductCreate(ProductBase):
    pass

class ProductRead(ProductBase):
    id: int

# --- Order Models ---

class OrderItemBase(SQLModel):
    product_id: int = Field(foreign_key="product.id")
    quantity: int
    price: float

class OrderItem(OrderItemBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    order_id: Optional[int] = Field(default=None, foreign_key="order.id")
    order: Optional["Order"] = Relationship(back_populates="items")

class OrderBase(SQLModel):
    customer_name: str
    customer_email: str
    total_price: float
    status: str = Field(default="pending")

class Order(OrderBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    items: List[OrderItem] = Relationship(back_populates="order")

class OrderCreate(OrderBase):
    items: List[OrderItemBase]

class OrderRead(OrderBase):
    id: int
    items: List[OrderItem]

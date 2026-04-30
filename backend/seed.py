from sqlmodel import Session, SQLModel
from database import engine, init_db
from models import Product

def seed_products():
    products = [
        {
            "name": "Aurora Wireless Headphones", "price": 249, "category": "audio", "rating": 4.8, "reviews": 1240,
            "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
            "description": "Studio-grade wireless headphones with adaptive noise cancellation and 40-hour battery life."
        },
        {
            "name": "Pulse Smart Watch Series 7", "price": 329, "category": "wearables", "rating": 4.7, "reviews": 890,
            "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
            "description": "Track your health and stay connected with always-on retina display and 7-day battery."
        },
        {
            "name": "Ember Ceramic Mug", "price": 89, "category": "home", "rating": 4.6, "reviews": 412,
            "image": "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=800&q=80",
            "description": "Temperature-controlled smart mug. Keep your coffee at the perfect 55°C for hours."
        },
        {
            "name": "Lumen Floor Lamp", "price": 179, "category": "lighting", "rating": 4.9, "reviews": 320,
            "image": "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80",
            "description": "Sculptural LED floor lamp with warm dimmable light and brushed brass finish."
        },
        {
            "name": "Forge Leather Backpack", "price": 219, "category": "accessories", "rating": 4.7, "reviews": 654,
            "image": "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80",
            "description": "Hand-stitched full-grain leather backpack with padded laptop sleeve."
        },
        {
            "name": "Lens Pro Mirrorless Camera", "price": 1499, "category": "cameras", "rating": 4.9, "reviews": 230,
            "image": "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80",
            "description": "Full-frame 45MP mirrorless camera with 8K video and in-body stabilization."
        },
        {
            "name": "Bloom Bluetooth Speaker", "price": 129, "category": "audio", "rating": 4.5, "reviews": 980,
            "image": "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80",
            "description": "Portable 360° speaker with 24-hour battery and waterproof design."
        },
        {
            "name": "Glide Fitness Tracker", "price": 99, "category": "wearables", "rating": 4.4, "reviews": 1520,
            "image": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?auto=format&fit=crop&w=800&q=80",
            "description": "Slim fitness band with heart-rate, SpO2 and 14-day battery life."
        },
        {
            "name": "Mesa Walnut Side Table", "price": 299, "category": "home", "rating": 4.8, "reviews": 142,
            "image": "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?auto=format&fit=crop&w=800&q=80",
            "description": "Solid walnut side table with hand-rubbed oil finish."
        },
        {
            "name": "Halo Pendant Light", "price": 159, "category": "lighting", "rating": 4.6, "reviews": 88,
            "image": "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=800&q=80",
            "description": "Minimalist ring pendant in matte black with soft diffused glow."
        },
        {
            "name": "Trail Canvas Crossbody", "price": 79, "category": "accessories", "rating": 4.3, "reviews": 215,
            "image": "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80",
            "description": "Water-resistant canvas crossbody bag with adjustable strap."
        },
        {
            "name": "Pocket Vintage Film Camera", "price": 449, "category": "cameras", "rating": 4.7, "reviews": 64,
            "image": "https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?auto=format&fit=crop&w=800&q=80",
            "description": "Compact rangefinder with classic 35mm film aesthetic and modern sensor."
        }
    ]

    with Session(engine) as session:
        for p_data in products:
            product = Product(**p_data)
            session.add(product)
        session.commit()
    print("Database seeded successfully!")

if __name__ == "__main__":
    # Drop and recreate tables to ensure schema is fresh
    print("Refreshing database schema...")
    SQLModel.metadata.drop_all(engine)
    SQLModel.metadata.create_all(engine)
    seed_products()

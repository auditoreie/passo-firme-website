import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export interface Products {
  id?: string;
  createdAt?: number;
  title: string;
  description: string;
  code: string;
  isPromotional: boolean;
  availableSizes: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
}

export interface Categories {
  id?: string;
  title: string;
}
 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<Products>;
  private promotionalProductsCollection: AngularFirestoreCollection<Products>
  private recentProductsCollection: AngularFirestoreCollection<Products>
  private categoriesCollection: AngularFirestoreCollection<Categories>

  private products: Observable<Products[]>;
  private promotionalProducts: Observable<Products[]>
  private recentProducts: Observable<Products[]>
  private categories: Observable<Categories[]>
 
  constructor(db: AngularFirestore) {
    this.categoriesCollection = db.collection<Categories>('categories')
    this.productsCollection = db.collection<Products>('products')
    this.recentProductsCollection = db.collection<Products>('products', ref => ref.orderBy('createdAt', 'desc'));
 
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.categories = this.categoriesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    console.log(this.categories, this.categoriesCollection)

    this.promotionalProducts = this.promotionalProductsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.recentProducts = this.recentProductsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
 
  getAllProducts() {
    return this.products
  }

  getAllCategories() {
    return this.categories
  }

  getPromotionalProducts() {
    return this.promotionalProducts
  }

  getRecentProducts() {
    return this.recentProducts
  }

  getCategory(id) {
    return this.categoriesCollection.doc<Categories>(id).valueChanges()
  }

  addCategory(categories: Categories): Promise<DocumentReference> {
    return this.categoriesCollection.add(categories)
  }

  updateCategory(category: Categories): Promise<void> {
    return this.categoriesCollection.doc(category.id).update({
      title: category.title
    })
  }

  deleteCategory(id: string): Promise<void> {
    return this.categoriesCollection.doc(id).delete();
  }
  }

  addProductByCategory(category: Categories, db: AngularFirestore, products: Products) {
    return db.collection(`categories/${category.id}/products`).add(products)
  }

  getProduct(id) {
    return this.productsCollection.doc<Products>(id).valueChanges();
  }

  addProduct(products: Products): Promise<DocumentReference> {
    return this.productsCollection.add(products);
  }
 
  updateProduct(product: Products): Promise<void> {
    return this.productsCollection.doc(product.id).update({  
      code: product.code, 
      title: product.title, 
      description: product.description, 
      isPromotional: product.isPromotional,
      availableSizes: product.availableSizes,
      image1: product.image1,
      image2: product.image2,
      image3: product.image3,
      image4: product.image4
     });
  }
 
  deleteProduct(id: string): Promise<void> {
    return this.productsCollection.doc(id).delete();
  }
}
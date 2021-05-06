import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Product {
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
  categories?: Category[]
}

export interface Category {
  id?: string;
  createdAt?: number;
  title: string;
}

export interface ClickCounter {
  id: string;
  upClick: number;
  clicks: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<Product>;
  private categoriesCollection: AngularFirestoreCollection<Category>
  private totalClicksCollection: AngularFirestoreCollection<ClickCounter>

  private products: Observable<Product[]>
  private categories: Observable<Category[]>
  private totalClicks: Observable<ClickCounter[]>

  constructor(db: AngularFirestore) {
    this.categoriesCollection = db.collection<Category>('categories', ref => ref.orderBy('createdAt', 'desc'))
    this.productsCollection = db.collection<Product>('products', ref => ref.orderBy('createdAt', 'desc'))
    this.totalClicksCollection = db.collection<ClickCounter>('clicks')

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

    this.totalClicks = this.totalClicksCollection.snapshotChanges().pipe(
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

  getTotalClicks() {
    return this.totalClicks
  }

  upClick(click: ClickCounter, id: string) {
    return this.totalClicksCollection.doc(id).update({
      clicks: click.clicks
    })
  }

  getCategory(id) {
    return this.categoriesCollection.doc<Category>(id).valueChanges()
  }

  addCategory(categories: Category): Promise<DocumentReference> {
    return this.categoriesCollection.add(categories)
  }

  updateCategory(category: Category): Promise<void> {
    return this.categoriesCollection.doc(category.id).update({
      title: category.title
    })
  }

  deleteCategory(id: string): Promise<void> {
    return this.categoriesCollection.doc(id).delete();
  }

  getProductByCategory( category: Category, id: string) {
    /* return this.categoriesCollection.doc(`categories/${category.id}/products`).valueChanges() */
    /* return this.categoriesCollection.doc<Categories>(id).collection('products').valueChanges() */
  }

  addProductByCategory( category: Category, db: AngularFirestore, products: Product) {
    return db.collection(`categories/${category.id}/products`).add(products)
  }

  getProduct(id) {
    return this.productsCollection.doc<Product>(id).valueChanges();
  }

  addProduct(products: Product): Promise<DocumentReference> {
    return this.productsCollection.add(products);
  }

  updateProduct(product: Product): Promise<void> {
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

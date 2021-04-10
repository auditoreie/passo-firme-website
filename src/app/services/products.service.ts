import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
 
export interface Products {
  id?: string;
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
 
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productsCollection: AngularFirestoreCollection<Products>;
  private promotionalProductsCollection: AngularFirestoreCollection<Products>

  private products: Observable<Products[]>;
  private promotionalProducts: Observable<Products[]>
 
  constructor(db: AngularFirestore) {
    this.productsCollection = db.collection<Products>('products');
    this.promotionalProductsCollection = db.collection<Products>('products', ref => ref.where('isPromotional', '==', true));
 
    this.products = this.productsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );

    this.promotionalProducts = this.promotionalProductsCollection.snapshotChanges().pipe(
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
    return this.products;
  }

  getPromotionalProducts() {
    return this.promotionalProducts;
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
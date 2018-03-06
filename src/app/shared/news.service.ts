import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { News } from './news'
import { IServerResponse } from './i-server-response';
import { Pagination } from './pagination';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Response } from "@angular/http";

@Injectable()
export class NewsService {

  constructor(private httpClient: HttpClient) { }

  apiEndpoint: string = 'https://evandersar-news-data.herokuapp.com/news';

  public getNews(pagination: Pagination): Observable<any> {
    const params = pagination.category ?
      new HttpParams().set('category', `${pagination.category}`).set('_page', `${pagination.page}`).set('_limit', `${pagination.ipp}`) :
      new HttpParams().set('_page', `${pagination.page}`).set('_limit', `${pagination.ipp}`);

    return this.httpClient.get<News[]>(this.apiEndpoint, { params: params, observe: "response" });
  }

  public getOneNews(id: number): Observable<News>{
    return this.httpClient.get<News>(`${this.apiEndpoint}/${id}`);
  }

  public createNews(news: News): Observable<News>{
    return this.httpClient.post<News>(this.apiEndpoint, news);
  }

  public updateNews(news: News, id: number): Observable<News>{
    return this.httpClient.put<News>(`${this.apiEndpoint}/${id}`, news);
  }

  /**
   * Simulate an async HTTP calls with a delayed observable.
   */
  public serverAll(pagination: Pagination): Observable<IServerResponse> {
    const perPage = pagination.ipp;
    const start = (pagination.page - 1) * perPage;
    const end = start + perPage;
    let filteredItems = this.allNews;
    if (pagination.category) filteredItems = this.allNews.filter(item => item.category === pagination.category);

    return Observable
      .of({
        items: filteredItems.slice(start, end),
        total: filteredItems.length
      }).delay(1000);
  }

  public serverOne(id: number): Observable<News> {
    let filteredNews = this.allNews.filter(item => item.id === id);
    return Observable.of(filteredNews[0]).delay(500);
  }

  public serverCreate(newsObj): Observable<News> {
    let initLength: number = this.allNews.length;

    newsObj.id = initLength + 1;
    this.allNews.push(newsObj);

    return Observable.of(this.allNews[initLength]).delay(500);
  }


  private allNews: News[] = [{
    "id": 1,
    "title": "Ergonomic context-sensitive secured line",
    "category": "life",
    "description": "Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque."
  }, {
    "id": 2,
    "title": "Profound demand-driven synergy",
    "category": "health",
    "description": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."
  }, {
    "id": 3,
    "title": "Multi-tiered explicit moderator",
    "category": "life",
    "description": "Suspendisse potenti. Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue."
  }, {
    "id": 4,
    "title": "Re-contextualized mobile alliance",
    "category": "health",
    "description": "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."
  }, {
    "id": 5,
    "title": "Focused analyzing protocol",
    "category": "health",
    "description": "Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum."
  }, {
    "id": 6,
    "title": "Enterprise-wide methodical software",
    "category": "life",
    "description": "Vivamus vestibulum sagittis sapien. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem."
  }, {
    "id": 7,
    "title": "Visionary 6th generation moderator",
    "category": "health",
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat."
  }, {
    "id": 8,
    "title": "Networked homogeneous extranet",
    "category": "life",
    "description": "Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit."
  }, {
    "id": 9,
    "title": "Secured human-resource open architecture",
    "category": "life",
    "description": "In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc."
  }, {
    "id": 10,
    "title": "Configurable homogeneous interface",
    "category": "life",
    "description": "Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque. Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus."
  }, {
    "id": 11,
    "title": "Optional dedicated pricing structure",
    "category": "life",
    "description": "Morbi quis tortor id nulla ultrices aliquet. Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui. Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti."
  }, {
    "id": 12,
    "title": "Persistent multimedia utilisation",
    "category": "health",
    "description": "Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede."
  }, {
    "id": 13,
    "title": "Advanced client-driven forecast",
    "category": "health",
    "description": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
  }, {
    "id": 14,
    "title": "Quality-focused fresh-thinking time-frame",
    "category": "health",
    "description": "Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus."
  }, {
    "id": 15,
    "title": "Reduced high-level model",
    "category": "health",
    "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis."
  }, {
    "id": 16,
    "title": "Front-line radical utilisation",
    "category": "food",
    "description": "Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo. Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis. Sed ante."
  }, {
    "id": 17,
    "title": "Polarised methodical service-desk",
    "category": "life",
    "description": "Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem."
  }, {
    "id": 18,
    "title": "Down-sized mission-critical standardization",
    "category": "life",
    "description": "Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."
  }, {
    "id": 19,
    "title": "Optimized bandwidth-monitored portal",
    "category": "life",
    "description": "Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl."
  }, {
    "id": 20,
    "title": "Virtual disintermediate project",
    "category": "health",
    "description": "Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem. Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit."
  }, {
    "id": 21,
    "title": "Persevering maximized interface",
    "category": "life",
    "description": "Suspendisse accumsan tortor quis turpis. Sed ante. Vivamus tortor. Duis mattis egestas metus. Aenean fermentum. Donec ut mauris eget massa tempor convallis."
  }, {
    "id": 22,
    "title": "Progressive neutral benchmark",
    "category": "health",
    "description": "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus."
  }, {
    "id": 23,
    "title": "Distributed exuding access",
    "category": "life",
    "description": "Duis aliquam convallis nunc. Proin at turpis a pede posuere nonummy. Integer non velit. Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum."
  }, {
    "id": 24,
    "title": "Sharable modular solution",
    "category": "life",
    "description": "Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit."
  }, {
    "id": 25,
    "title": "Innovative didactic artificial intelligence",
    "category": "life",
    "description": "Aenean sit amet justo. Morbi ut odio. Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit."
  }, {
    "id": 26,
    "title": "Optimized encompassing utilisation",
    "category": "life",
    "description": "Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum. Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo."
  }, {
    "id": 27,
    "title": "Future-proofed systematic archive",
    "category": "life",
    "description": "Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti. Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris."
  }, {
    "id": 28,
    "title": "Proactive global knowledge base",
    "category": "life",
    "description": "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."
  }, {
    "id": 29,
    "title": "Reverse-engineered empowering product",
    "category": "life",
    "description": "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."
  }, {
    "id": 30,
    "title": "Team-oriented zero defect matrices",
    "category": "life",
    "description": "Morbi porttitor lorem id ligula. Suspendisse ornare consequat lectus. In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl."
  }, {
    "id": 31,
    "title": "Open-source upward-trending archive",
    "category": "food",
    "description": "Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus."
  }, {
    "id": 32,
    "title": "Cloned directional website",
    "category": "health",
    "description": "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."
  }, {
    "id": 33,
    "title": "Fully-configurable client-server hub",
    "category": "health",
    "description": "Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Proin eu mi. Nulla ac enim."
  }, {
    "id": 34,
    "title": "Ergonomic object-oriented open system",
    "category": "life",
    "description": "Fusce consequat. Nulla nisl. Nunc nisl. Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus."
  }, {
    "id": 35,
    "title": "Versatile homogeneous customer loyalty",
    "category": "life",
    "description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus. Pellentesque at nulla. Suspendisse potenti."
  }, {
    "id": 36,
    "title": "Seamless attitude-oriented workforce",
    "category": "food",
    "description": "Ut tellus. Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
  }, {
    "id": 37,
    "title": "Adaptive 4th generation ability",
    "category": "food",
    "description": "Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat. In congue. Etiam justo. Etiam pretium iaculis justo."
  }, {
    "id": 38,
    "title": "Enhanced 3rd generation process improvement",
    "category": "food",
    "description": "Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede."
  }, {
    "id": 39,
    "title": "Programmable high-level knowledge user",
    "category": "life",
    "description": "Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis. Fusce posuere felis sed lacus."
  }, {
    "id": 40,
    "title": "Customer-focused dedicated moratorium",
    "category": "food",
    "description": "Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo."
  }, {
    "id": 41,
    "title": "De-engineered bifurcated concept",
    "category": "food",
    "description": "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."
  }, {
    "id": 42,
    "title": "Distributed incremental application",
    "category": "health",
    "description": "Vestibulum rutrum rutrum neque. Aenean auctor gravida sem. Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio."
  }, {
    "id": 43,
    "title": "Diverse transitional implementation",
    "category": "health",
    "description": "Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis."
  }, {
    "id": 44,
    "title": "Progressive tangible toolset",
    "category": "food",
    "description": "Curabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem. Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit."
  }, {
    "id": 45,
    "title": "Open-architected high-level algorithm",
    "category": "life",
    "description": "Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero. Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum."
  }, {
    "id": 46,
    "title": "Diverse clear-thinking analyzer",
    "category": "food",
    "description": "Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus."
  }, {
    "id": 47,
    "title": "Decentralized solution-oriented matrix",
    "category": "health",
    "description": "Etiam pretium iaculis justo. In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus. Nulla ut erat id mauris vulputate elementum."
  }, {
    "id": 48,
    "title": "Horizontal encompassing parallelism",
    "category": "life",
    "description": "In sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti. In eleifend quam a odio. In hac habitasse platea dictumst."
  }, {
    "id": 49,
    "title": "Distributed demand-driven open architecture",
    "category": "health",
    "description": "Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede."
  }, {
    "id": 50,
    "title": "Visionary client-server archive",
    "category": "health",
    "description": "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque. Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus. In sagittis dui vel nisl. Duis ac nibh."
  }];

}

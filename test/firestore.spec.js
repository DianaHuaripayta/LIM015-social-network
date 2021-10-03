/* eslint-disable no-undef */
import MockFirebase from 'mock-cloud-firestore';
import {getAllCategories, getPost,deletePostFs, updatePost, getAllPosts} from '../src/db/firestore.js'//getAllPosts es importante porque es quien tienen todos los posts de firebase
//simulacion de la base de datos
const fixtureData = {
  __collection__: {
    posts: {
      __doc__: {
        abc123: {
          post: 'My first post',
          idCategory: "1"
        },
        abc125: {
          post: 'My second post',
          idCategory: "2"
        },
        abc129: {
          post: 'Hola mundo!!!',
          idCategory: "3"
        },
      },
    },
    categories: {
      __doc__: {
        '1': {
          totalPosts: 8
        },
        '2': {
         
          totalPosts: 6
        },
        '3': {
        
          totalPosts: 3
        },
      },
    },
  },
};

// Colocamos 'isNaiveSnapshotListenerEnabled: true' para que onSnapshot dea toda su informacion
global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });//muy importante snapshot es el obj que contiene la data de la base de datos
/* ---------------getPost----------------- */
describe('getPost', () => {
  it('darme todos los posts', () => getPost('abc125').then((dataPost) => {
    const result = dataPost.data();
    expect(result.post).toBe('My second post');
  }));
});
/* ---------------getCategory----------------- */
describe('getPost', () => {
  it('deberia darme los posts', () => 
  getAllCategories().then((response) => {
    response.forEach(doc =>{
      const result = doc.data();
      console.log(result)
    expect(result).toEqual( { totalPosts: '8' }, { totalPosts: '6' });
    })
    
  }));
});

/* --------------deletePostFs---------------- */
describe('deletePostFs', () =>{
   it('it should delete posts', () =>{
       deletePostFs().then((postDoc)=>{
        expect(postDoc).toBe(undefined);
        getAllPosts()
       })
   })
})

/* --------test------ */
describe('updatePost', () => {
  it('debería poder actualizar un post por su id', async () => {
    const posts = await getAllPosts();
    posts.forEach((doc) => {
      if (doc.id === 'abc125') {
        updatePost('abc125', { post: 'Post modificado' }).then(() => {
          const result = doc.data();
          expect(result.post).toBe('Post modificado');
        });
      }
    });
  });
});

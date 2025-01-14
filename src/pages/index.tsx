import SearchableLayout from '@/components/searchable-layout';
import style from './index.module.css';
import { ReactNode } from 'react';
import books from "@/mock/books.json";
import BookItem from '@/components/book-item';
import { InferGetServerSidePropsType } from 'next';
import { useEffect } from 'react';
import fetchBooks from '@/Lib/fetch-books';
import fetchRandomBooks from '@/Lib/fetch-randombooks';


export const getServerSideProps =  async () => {

  const [allBooks, recoBooks] = await Promise.all([
    fetchBooks(),
    fetchRandomBooks(),
  ]);

  return {
    props: {
      allBooks,
      recoBooks,
    }
  }

};


export default function Home({allBooks, recoBooks}: InferGetServerSidePropsType<typeof getServerSideProps>){



  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천 하는 도서</h3>
        {recoBooks.map((book) => (
          < BookItem key={book.id} {...book} />
        ))}
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        {allBooks.map((book) => (
          <BookItem key={book.id} {...book} />
        ))}
      </section>
    </div>
  )
}


Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
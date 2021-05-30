import { GetStaticProps } from 'next';
import Head from 'next/head';

import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {
  return (
    <>
      <Head>
        <title>Space Traveling</title>
      </Head>

      <main className={styles.contentContainer}>
        <img src="/images/logo.svg" alt="logo"/>

        <div className={styles.posts}>
          <a href="#">
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.info}>
              <div className={styles.createdAt}>
                <img src="/images/calendar.svg" alt="calendar_icon"/>
                <time>15 Mar 2021</time>
              </div>
              <div className={styles.author}>
                <img src="/images/author.svg" alt="author_icon"/>
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>

          <a href="#">
            <strong>Criando um app CRA do zero</strong>
            <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
            <div className={styles.info}>
              <div className={styles.createdAt}>
                <img src="/images/calendar.svg" alt="calendar_icon"/>
                <time>19 Abr 2021</time>
              </div>
              <div className={styles.author}>
                <img src="/images/author.svg" alt="author_icon"/>
                <span>Danilo Vieira</span>
              </div>
            </div>
          </a>

          <a href="#">
            <strong>Como utilizar Hooks</strong>
            <p>Pensando em sincronização em vez de ciclos de vida.</p>
            <div className={styles.info}>
              <div className={styles.createdAt}>
                <img src="/images/calendar.svg" alt="calendar_icon"/>
                <time>15 Mar 2021</time>
              </div>
              <div className={styles.author}>
                <img src="/images/author.svg" alt="author_icon"/>
                <span>Joseph Oliveira</span>
              </div>
            </div>
          </a>

          <a href="#">
            <strong>Criando um app CRA do zero</strong>
            <p>Tudo sobre como criar a sua primeira aplicação utilizando Create React App</p>
            <div className={styles.info}>
              <div className={styles.createdAt}>
                <img src="/images/calendar.svg" alt="calendar_icon"/>
                <time>19 Abr 2021</time>
              </div>
              <div className={styles.author}>
                <img src="/images/author.svg" alt="author_icon"/>
                <span>Danilo Vieira</span>
              </div>
            </div>
          </a>
        </div>

        <div className={styles.loading}>
          <a>Carregar mais posts</a>
        </div>
        
      </main>
    </>
  )
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

// };

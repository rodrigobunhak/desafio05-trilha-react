import { GetStaticPaths, GetStaticProps } from 'next';
import { RichText } from 'prismic-dom';
import Header from '../../components/Header';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';
import { useRouter } from 'next/router';
import React from 'react';
import Head  from 'next/head';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
// import { Head } from 'next/document';
// import { Head } from 'next/document';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({post}: PostProps ) {
  
  const totalWords = post.data.content.reduce((total, contentItem) => {
    
    total += contentItem.heading.split(' ').length;

    const words = contentItem.body.map(item => item.text.split(' ').length); // 4

    words.map(word => (total += word))

    return total;
  }, 0)

  const readTime = Math.ceil(totalWords / 200)

  const router = useRouter();

  if(router.isFallback) {
    return <h1>Carregando...</h1>
  }

  const formatedDate = format(
    new Date(post.first_publication_date),
    'dd MMM yyyy',
    {
      locale: ptBR,
    }
  )

  return (
    <>
      <Head>
        <title>{post.data.title} | Space Traveling</title>
      </Head>
      <Header />
      <img src={post.data.banner.url} alt="imagem" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.header_post}>
          <h1>
            {post.data.title}
          </h1>
          <ul>
            <li>
              <img src="/calendar.svg" alt="calendar_icon"/>
              <time>{formatedDate}</time>
            </li>
            <li>
              <img src="/author.svg" alt="author_icon"/>
              <span>{post.data.author}</span>
            </li>
            <li>
              <img src="/clock.svg" alt="clock_icon"/>
              <span>{`${readTime} min`}</span>
            </li>
          </ul>
        </div>

          {post.data.content.map(content => {
            return (
              <div className={styles.content_post} key={content.heading}>
                <h2>{content.heading}</h2>
                <div
                  dangerouslySetInnerHTML={{
                  __html: RichText.asHtml(content.body)
                }}/>
              </div>
            )
          })}

      </main>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: {
        slug: post.uid,
      }
    }
  })

  return {
    paths,
    fallback: true,
  }
};

export const getStaticProps: GetStaticProps = async context => {
  const prismic = getPrismicClient();
  const { slug } = context.params;
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      author: response.data.author,
      banner: {
        url: response.data.banner.url,
      },
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body]
        }
      })
    }
  }

  // console.log(JSON.stringify(post.data.content, null, 2))

  return {
    props: {
      post,
    }
  }
};


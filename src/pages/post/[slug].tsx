import { GetStaticPaths, GetStaticProps } from 'next';
import Header from '../../components/Header';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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
  return (
    <>
      <Header />
      <img src="/teste.png" alt="imagem" className={styles.banner} />
      <main className={commonStyles.container}>
        <div className={styles.post}>
          <h1>
            Criando um app CRA do zero
          </h1>
          <ul>
            <li>
              <img src="/calendar.svg" alt="calendar_icon"/>
              <time>15 Mar 2021</time>
            </li>
            <li>
              <img src="/author.svg" alt="author_icon"/>
              <span>Joseph Oliveira</span>
            </li>
            <li>
              <img src="/clock.svg" alt="author_icon"/>
              <span>4 min</span>
            </li>
          </ul>
          <div className={styles.content}>
            <h2>Proin et varius</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/><br/>

Nullam dolor sapien, vulputate eu diam at, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

Ut venenatis mauris vel libero pretium, et pretium ligula faucibus.<br/><br/> Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.
            </p>
            <h2>Proin et varius</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br/><br/>

Nullam dolor sapien, <strong>vulputate eu diam at</strong>, condimentum hendrerit tellus. Nam facilisis sodales felis, pharetra pharetra lectus auctor sed.

Ut venenatis mauris vel libero pretium, et pretium ligula faucibus.<br/><br/> Morbi nibh felis, elementum a posuere et, vulputate et erat. Nam venenatis.
            </p>
            <h2>Cras laoreet mi</h2>
            <p>Nulla auctor sit amet quam vitae commodo. Sed risus justo, vulputate quis neque eget, dictum sodales sem. In eget felis finibus, mattis magna a, efficitur ex. <br/><br/>Curabitur vitae justo consequat sapien gravida auctor a non risus. Sed malesuada mauris nec orci congue, interdum efficitur urna dignissim. Vivamus cursus elit sem, vel facilisis nulla pretium consectetur. Nunc congue.<br/><br/>

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. <br/><br/>Aliquam consectetur massa nec metus condimentum, sed tincidunt enim tincidunt. Vestibulum fringilla risus sit amet massa suscipit eleifend. Duis eget metus cursus, suscipit ante ac, iaculis est. Donec accumsan enim sit amet lorem placerat, eu dapibus ex porta. Etiam a est in leo pulvinar auctor. Praesent sed vestibulum elit, consectetur egestas libero.
            </p>
          </div>
        </div>
      </main>
    </>
  )
}

// export const getStaticPaths = async () => {
//   const prismic = getPrismicClient();
//   const posts = await prismic.query(TODO);

//   // TODO
// };

// export const getStaticProps = async context => {
//   const prismic = getPrismicClient();
//   const response = await prismic.getByUID(TODO);

//   // TODO
// };

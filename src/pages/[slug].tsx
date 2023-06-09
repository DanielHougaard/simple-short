import { GetServerSideProps } from 'next';
import { getLink } from '../services/link.service';
import { Params } from '../types';

export default function Redirect() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, req }) => {
  const { slug } = params as Params;
  const host = req.headers.host as string;

  const { data } = await getLink(host, slug).catch(() => ({ data: { url: '/' } }));

  return {
    redirect: {
      destination: data.url,
      permanent: false,
    },
  };
};

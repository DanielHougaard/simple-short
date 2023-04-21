import { Field, Formik, FormikHelpers } from 'formik';
import { GetServerSideProps } from 'next';
import React from 'react';
import validator from 'validator';
import * as yup from 'yup';
import Button from '../components/Button';
import Footer from '../components/Footer';
import Input from '../components/Input';
import PageContainer from '../components/PageContainer';
import { createLink } from '../services/link.service';

type Values = {
  url: string;
  short_url: string;
};

type Props = {
  host: string;
};

export default function Home({ host }: Props) {
  const handleSubmit = React.useCallback(async (values: Values, actions: FormikHelpers<Values>) => {
    await createLink(values.url)
      .then(({ data }) => actions.setFieldValue('short_url', `${host}/${data.slug}`))
      .catch(() => actions.setFieldError('url', 'Something went wrong, please try again later.'));
  }, [host]);

  return (
    <Formik
      initialValues={{ url: '', short_url: '' }}
      onSubmit={handleSubmit}
      validationSchema={yup.object().shape({
        url: yup.string().required('Please enter a valid URL').test('is-url', 'Please enter a valid URL', (value) => validator.isURL(value)), // Could be replaced with a regex to cut down on deps.
      })}
    >
      {({ isValid, touched, values, isSubmitting }) => (
        <>
          <PageContainer>
            <div className="flex h-full justify-center flex-col max-sm:p-4">
              <div>
                <span className="text-4xl font-medium">Welcome to</span>
                <span className="text-4xl font-bold text-blue-500"> Short.it,</span>
                <p className="text-xl text-blue-500">A URL Shortener that just makes sense.</p>
              </div>

              <div className="flex items-center max-sm:flex-col justify-center mt-5 w-full gap-3">
                <Field name="url" as={Input} invalid={!isValid && touched.url} placeholder="google.com" />
                <Button className="max-sm:w-full" type="submit" loading={isSubmitting} disabled={!isValid}>Shorten</Button>
              </div>

              {values.short_url && (
              <div className="flex flex-col justify-center mt-16 w-full gap-3">
                <Input value={values.short_url} readOnly copy />
              </div>
              )}

            </div>

          </PageContainer>
          <Footer />
        </>
      )}
    </Formik>

  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => ({
  props: {
    host: req.headers.host,
  },
});

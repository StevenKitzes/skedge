import Button from '../components/Button'
import Layout from '../components/Layout'

function Construction() {
  return (
    <Layout>
      <h1>This page under construction.</h1>
      <Button
        href='/'
        label='Back to Skedge'
      />
      <style jsx>
        {`
          h1 {
            margin-bottom: 32px;
          }
        `}
      </style>
    </Layout>
  )
}

export default Construction

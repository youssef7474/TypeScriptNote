import { Container } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'

const LayOut = () => {
  return (
    <div>
        <Container className="my-4">
      <Outlet></Outlet>
      </Container>
    </div>
  )
}

export default LayOut

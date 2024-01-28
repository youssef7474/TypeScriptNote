import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap"
import { Tag } from "../../../Navigations/Navigation"
import { EditmodalProps } from "../pages/HomePage"

type EditTagsModalProps={
    show:boolean,
    handelClose:()=>void,
    availableTags:Tag[]
}&EditmodalProps

const EditTagsModal = ({availableTags,show,handelClose,DeleteTag,UpdateTag}:EditTagsModalProps) => {
  return (
    <>
        <Modal show={show} onHide={handelClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {
                            availableTags.map((tag)=>(
                                <Row key={tag.id}>
                                    <Col>
                                        <Form.Control type="text" value={tag.label} onChange={e=>UpdateTag(tag.id,e.target.value)}/>
                                    </Col>
                                    <Col xs="auto">
                                        <Button variant="outline-danger" onClick={()=>DeleteTag(tag.id)}>X</Button>
                                    </Col>
                                </Row>
                            ))
                        }
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    </>
  )
}

export default EditTagsModal

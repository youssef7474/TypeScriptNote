import { useMemo, useState } from "react";
import { Badge, Button, Card, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import {  Tag } from "../../../Navigations/Navigation";
import styles from "./HomePage.module.css"
import EditTagsModal from "../Modal/EditTagsModal";

type SimplifiedNote={
    tags:Tag[],
    title:string,
    id:string
}

type NoteListProps = {
  availableTags: Tag[],
  notes:SimplifiedNote[]
}&EditmodalProps

export type EditmodalProps={
  DeleteTag:(id:string)=>void,
  UpdateTag:(id:string,label:string)=>void
}

const HomePage = ({ availableTags, notes,DeleteTag,UpdateTag }: NoteListProps) => {
  const [SelectedTags, SetSelectedTags] = useState<Tag[]>([]);

  const [title,setTitle]=useState("")

  const [showEditTagModal,SetshowEditTagModal]=useState(false)

  const filteredNotes=useMemo(()=>{
    return notes.filter(note=>{
        return(
            (title===""||
                note.title.toLowerCase().includes(title.toLowerCase()))&&
            (SelectedTags.length===0||
                SelectedTags.every(tag=>
                    note.tags.some(noteTag=>noteTag.id === tag.id)    
                )    
            )    
        )
    })
  },[title,SelectedTags,notes])

  return (
    <>


      <Row className="align-items-center mb-4">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack direction="horizontal" gap={2}>
            <Link to="/new">
              <Button variant="primary">create</Button>
            </Link>
            <Button variant="outline-secondary" onClick={()=>SetshowEditTagModal(true)}>Edit tags</Button>
          </Stack>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={(e)=>setTitle(e.target.value)}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <ReactSelect
                isMulti
                required
                value={SelectedTags.map((el) => {
                  return {
                    label: el.label,
                    value: el.id,
                  };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  SetSelectedTags(
                    tags.map((tag) => {
                      return {
                        label: tag.label,
                        id: tag.value,
                      };
                    })
                  );
                }}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {
            filteredNotes.map((el)=>(
                <Col key={el.id}>
                    <NoteCard id={el.id} title={el.title} tags={el.tags}/>
                </Col>
            ))
        }
      </Row>
      <EditTagsModal UpdateTag={UpdateTag} DeleteTag={DeleteTag}  availableTags={availableTags} show={showEditTagModal} handelClose={()=>SetshowEditTagModal(false)}/>
 
    </>
  );
};

export default HomePage;


function NoteCard({id,title,tags}:SimplifiedNote){
    return(
        <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
            <Card.Body> 
                <Stack gap={2} className="align-items-center justify-content-center h-100">
                    <span className="fs-5">{title}</span>
                    {
                        tags.length>0 &&(
                            <Stack gap={1} direction="horizontal" className="justify-content-center flex-lg-wrap">
                                {
                                    tags.map((el)=>(
                                        <Badge className="text-truncate" key={el.id}>
                                            {el.label}
                                        </Badge>
                                    ))
                                }
                            </Stack>
                        )
                    }
                </Stack>
            </Card.Body>
        </Card>
    )
}

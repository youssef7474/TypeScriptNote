import { FormEvent, useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CraetableReactSelect from "react-Select/creatable";
import { NoteData, Tag } from "../../../Navigations/Navigation";
import {v4 as uuidV4} from "uuid"


type NoteFormProps={
  onSubmit :(data:NoteData)=>void,
  onAddTag:(tag:Tag)=>void,
  availableTags:Tag[]
}&Partial<NoteData>

const NoteForm = ({onSubmit,onAddTag,availableTags,title="",marDown="",tags=[]}:NoteFormProps) => {
    const TitleRef=useRef<HTMLInputElement>(null)
    const MarkDownRef=useRef<HTMLTextAreaElement>(null)

    const [SelectedTags,SetSelectedTags]=useState<Tag[]>(tags)


    const navigate = useNavigate()

    const handelSubmit=(e:FormEvent)=>{
        e.preventDefault()
        onSubmit({
          title:TitleRef.current!.value,
          marDown:MarkDownRef.current!.value,
          tags:SelectedTags
        })
        navigate("..")
    }

  return (
    <Form onSubmit={handelSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId="Title">
              <Form.Label>Title</Form.Label>
              <Form.Control required ref={TitleRef} defaultValue={title}></Form.Control>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="Tags">
              <Form.Label>Tags</Form.Label>
              <CraetableReactSelect isMulti required 
              onCreateOption={label=>{
                const newTag={id:uuidV4(),label}
                onAddTag(newTag)
                SetSelectedTags(prev=>[...prev,newTag])
              }}
              value={SelectedTags.map((el)=>{
                return{
                  label:el.label,
                  value:el.id
                }
              })}
              options={availableTags.map(tag=>{
                return {label:tag.label,value:tag.id}
              })}
              onChange={tags=>{
                SetSelectedTags(tags.map(tag=>{
                  return{
                    label:tag.label,
                    id:tag.value
                  }
                }))
              }}

              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group controlId="markDown">
          <Form.Label>Body</Form.Label>
          <Form.Control required as="textarea" rows={15} ref={MarkDownRef} defaultValue={marDown}></Form.Control>
        </Form.Group>
        <Stack direction="horizontal" gap={2} className="justify-content-end">
          <Button type="submit" variant="primary">
            save
          </Button>
          <Link to="..">
            <Button type="button" variant="outline-secondary">
              cancel
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Form>
  );
};

export default NoteForm;

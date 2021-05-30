import React, { useEffect, useState } from 'react'
import './style.css'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import api from '../../services/api'

export default function NewVideo() {

  const [name, setName] = useState('');
  const [capa, setCapa] = useState('');
  const [url, setUrl] = useState('');
  const [descriptionVideo, setDescriptionVideo] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("60b3bcd0ff8c8c1afcc210b9")

  function handleName(e) {
    setName(e.target.value)
  }

  function handleCapa(e) {
    setCapa(e.target.value)
  }

  function handleUrl(e) {
    setUrl(e.target.value)
  }

  function handleCategory(e) {
    setCategory(e.target.value)
  }

  function handleDescriptionVideo(e) {
    setDescriptionVideo(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(`${name} -  ${capa} -  ${url} - ${category} - ${descriptionVideo}`)
    
      const result =  await api.post('http://localhost:8080/video', {
        name,
        urlImage: capa,
        urlVideo: url,
        description:descriptionVideo,
        categoryId: category
      })
      if(!result.data.error){
        alert('Vídeo salvo com sucesso!')
      }else {
        alert('Erro ao salvar no banco.')
      }

    } 

  useEffect(() => {

    async function loadCategories() {
      const { data } = await api.get('/category');
      let categoriesNames = data.categories.map( category => {
        return  {
          categoryId:category._id,
          name: category.name,
        }
      })
      setCategories(categoriesNames);
    }

    loadCategories();


  }, [])

  console.log(categories)

  return (
    <Container className='container'>
      <h1>Novo vídeo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label className='label'>Nome</Form.Label>
          <Form.Control
            type="name"
            placeholder="Digite o nome do vídeo"
            value={name}
            onChange={e => handleName(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicCapa">
          <Form.Label className='label'>Imagem (capa) </Form.Label>
          <Form.Control
            placeholder="Coloque a url da imagem"
            value={capa}
            onChange={e => handleCapa(e)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicUrl">
          <Form.Label className='label'>Url do vídeo</Form.Label>
          <Form.Control
            type="url"
            value={url}
            onChange={e => handleUrl(e)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlSelect1">
          <Form.Label className='label'>Categoria</Form.Label>
          <Form.Control 
          as="select" 
          onChange={e => handleCategory(e)}
          >
            {categories.map(category => (
              <option 
              value={category.categoryId}
              >
                {category.name}
              </option>
            ))
            }
          </Form.Control>
      
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className='label'>Descrição do vídeo</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descriptionVideo}
            onChange={e => handleDescriptionVideo(e)}
          />
        </Form.Group>
        <div className='buttons'>
          <Button variant="primary" type="submit">
            Salvar
        </Button>
          <LinkContainer to='/'>
            <Button variant="secondary">
              Cancelar
        </Button>
          </LinkContainer>
        </div>
      </Form>
    </Container>
  )
}


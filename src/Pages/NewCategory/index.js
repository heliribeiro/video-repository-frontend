import React, { useState } from 'react'
import './style.css'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'
import api from '../../services/api'

export default function NewCategory() {

  const [name, setName] = useState('');
  const [descriptionCategory, setDescriptionCategory] = useState('');
  const [color, setColor] = useState('#ffffff');

  function handleName(e) {
    setName(e.target.value)
  }

  function handleDescriptionCategory(e) {
    setDescriptionCategory(e.target.value)
  }

  function handleColor(e) {
    setColor(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(`${name} - ${descriptionCategory} - ${color}`)

    const result = await api.post('http://localhost:8080/category', {
      name,
      description: descriptionCategory,
      color
    })

    if (!result.data.error) {
      alert('Categoria cadastrada com sucesso!')
    } else {
      alert('Erro ao salvar no banco.')
    }

  }

  return (
    <Container className='container'>
      <h1>Nova categoria</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
          <Form.Label className='label'>Nome</Form.Label>
          <Form.Control
            type="name"
            placeholder="Digite o nome da categoria"
            value={name}
            onChange={(e) => handleName(e)}
          />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label className='label'>Descrição da categoria</Form.Label>
          <Form.Control
            as="textarea" rows={3}
            value={descriptionCategory}
            onChange={(e) => handleDescriptionCategory(e)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label className='label'>Cor da categoria</Form.Label>
          <Form.Control
            type="color"
            placeholder="Digite o nome do filme"
            value={color}
            onChange={(e) => handleColor(e)}
          />
        </Form.Group>

        <div className='buttons'>
          <Button
            variant="primary"
            type="submit"
          >
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
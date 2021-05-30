import React, { useState, useEffect } from 'react'
import './style.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Carousel from 'react-bootstrap/Carousel'
import { LinkContainer } from 'react-router-bootstrap'
import api from './../../services/api';

export default function Home() {

  const [categories, setCategories] = useState([])

  useEffect(() => {

    async function loadCategories() {
      const { data } = await api.get('/category');
      setCategories(data.categories);
    }

    loadCategories();


  }, [])

  return (
    <Container className='container home'>
      <nav className='header' >
        <LinkContainer to='/'>
          <span className="logo">DEVFLIX</span>
        </LinkContainer>
        <div>
          <LinkContainer to='/newvideo'>
            <Button className="header-button" type="submit">Novo vídeo</Button>
          </LinkContainer>
          <LinkContainer to='/newcategory'>
            <Button className="header-button" type="submit">Nova Categoria</Button>
          </LinkContainer>
        </div>
      </nav>

      <section className='row category'>
        {categories.map(category => (
          <div className='category-item'>
            <h2>{category.name}</h2>
            <Carousel>
              {category.videos.map(video => (
                <Carousel.Item className='carousel-item'>
                  <img
                    className="d-block w-100"
                    src={video.urlImage}
                    alt="First slide"
                  />
                  <Carousel.Caption>
                    <h3>{video.name}</h3>
                    <p>{video.description}</p>
                    <LinkContainer to={`/play/${video._id}`}>
                      <Button> CLique para assistir</Button>
                    </LinkContainer>
                  </Carousel.Caption>

                </Carousel.Item>
              ))}

            </Carousel>
          </div>
        ))
        }
      </section>
    </Container>
  )
}

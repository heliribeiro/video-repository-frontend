import React, { useEffect, useState } from 'react'
import api from '../../services/api'
import './style.css'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import { LinkContainer } from 'react-router-bootstrap'

export default function Play({ match: { params } }) {

  console.log(params.videoId)

  const [video, setVideo] = useState([])

  useEffect(() => {

    async function loadVIdeo() {
      const { data } = await api.get(`/video/${params.videoId}`);

      setVideo(data.video);
    }

    loadVIdeo();

  }, []);

  console.log(video)

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

      <div className='video'>
        <iframe width="800" height="500" src={video.urlVideo} title="YouTube category player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>

    </Container>
  )
}

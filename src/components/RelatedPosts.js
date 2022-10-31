import React from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'

import Typography from '@mui/material/Typography'

import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Divider } from '@mui/material'

function RelatedPosts({ relatedPosts, postId }) {
  return (
    <Box>
      <Divider sx={{ marginTop: '20px', marginBottom: '20px' }}>
        Related Posts
      </Divider>
      {relatedPosts.length > 1 ? (
        <>
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {relatedPosts
                .filter((item) => item._id !== postId)
                .splice(0, 3)
                .map((item) => (
                  <Grid item xs={4} sm={4} md={4} key={item._id}>
                    <Card>
                      <CardMedia
                        component='img'
                        height='140'
                        image={item.imageFile}
                        alt='green iguana'
                      />
                      <CardContent>
                        <Typography gutterBottom variant='h5' component='div'>
                          {item.title}
                        </Typography>
                        {item.tags.map((tag, index) => (
                          <Link
                            key={index}
                            to={`/posts/tag/${tag}`}
                            style={{
                              color: 'blue',
                              textDecoration: 'none',
                              marginRight: '10px',
                            }}
                          >
                            #{tag}
                          </Link>
                        ))}
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
            </Grid>
          </Box>
        </>
      ) : (
        <Box>No related posts!</Box>
      )}
    </Box>
  )
}

export default RelatedPosts

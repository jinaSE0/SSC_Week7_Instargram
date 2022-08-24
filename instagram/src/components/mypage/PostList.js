import React from 'react';
import { Grid, CardMedia, Card, Container, CardActionArea } from '@mui/material';


const itemData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


const PostList = (props) => {
    return (
        <>
            <Container sx={{ py: 8 }} maxWidth="lg">
                <Grid container spacing={4}>
                    {itemData.map((card) => (
                        <Grid item key={card} xs={12} sm={4} md={4}>
                            <Card
                                sx={{ height: '300px', width: '300px', display: 'flex', flexDirection: 'column' }}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            width: '300px',
                                            height: '300px'
                                        }}
                                        image="https://source.unsplash.com/random"
                                        alt="random"
                                    />
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default PostList;
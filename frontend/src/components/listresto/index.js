import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import Link from 'next/link';
import {
    Card,
    CardBody,
    CardImg,
    CardText,
    CardTitle,
    Row,
    Col
} from 'reactstrap';

const QUERY = gql `
    {
        restaurants {
            id
            name
            desc
            img {
                url
            }
        }
    }
    `;

function renderResto(restaurants) {
    return restaurants.map(res =>
        <Col xs="6" sm="4" key={res.id}>
            <Card>
                <CardImg
                    top={true} 
                    style={{height: 250}}
                    src={`${process.env.NEXT_PUBLIC_API_URL}${res.img[0].url}`} />
                <CardBody>
                    <CardTitle>{res.name}</CardTitle>
                    <CardText>{res.desc}</CardText>
                </CardBody>
                <div className="card-footer">
                    <Link 
                        as={`/resto/${res.id}`} 
                        href={`/resto?id=${res.id}`}>
                            <a className="btn btn-primary">View</a>
                    </Link>
                </div>
            </Card>
        </Col>
    )
}

function ListResto(props) {
    const { loading, error, data } = useQuery(QUERY);
    if (error) return "Error loading restaurants";
    if (loading) return <h1>Fetching Data</h1>;
    if (data.restaurants && data.restaurants.length) {
        const searchQuery = data.restaurants.filter(q => 
            q.name.toLowerCase().includes(props.search)
        );
        if (searchQuery.length != 0) {
            return (
                <Row>
                    {
                       renderResto(searchQuery)
                    }
                    <style jsx>
                        {
                            `
                            a {
                                color: white;
                            }
                            a:link {
                                text-decoration: none;
                                color: white;
                            }
                            a:hover {
                                font-weight: 600;
                                color: white;
                            }
                            .card-columns {
                                column-count: 3;
                            }
                            `
                        }
                    </style>
                </Row>
            )
        } else {
            return ( <h1>No Restaurants Found</h1> );
        }
    }
    return ( <h3>Add Resaurant</h3> );
}
export default ListResto;
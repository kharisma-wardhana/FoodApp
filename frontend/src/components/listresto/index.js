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

function ListResto(props) {
    const { loading, error, data } = useQuery(QUERY);
    if (error) return ( <h1>Err loading resto</h1> );
    if (loading) return ( <h1>Fetching Data</h1> );
    if (data.restaurants && data.restaurants.length) {
        const searchQuery = data.restaurants.filter((query) => query.name.toLowerCase().includes(props.search));

        if (searchQuery.length != 0) {
            return (
                <Row>
                    {searchQuery.map((res) => {
                        <Col xs="6" sm="4" key={res.id}>
                            <Card>
                                <CardImg
                                    top={true} 
                                    style={{height: 250}}
                                    src={`${process.env.NEXT_PUBLIC_API_URL}${res.img[0].uri}`} />
                                <CardBody>
                                    <CardTitle>{res.name}</CardTitle>
                                    <CardText>{res.desc}</CardText>
                                </CardBody>
                                <div className="card-footer">
                                    <Link 
                                        as={`/restaurants/${res.id}`} 
                                        href={`/restaurants?id=${res.id}`}>
                                            <a className="btn btn-primary">View</a>
                                    </Link>
                                </div>
                            </Card>
                        </Col>
                    })}
                    <style jsx global>
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
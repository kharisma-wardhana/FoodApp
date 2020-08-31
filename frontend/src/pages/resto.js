import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import { gql } from 'apollo-boost';

import { useContext } from "react";
import AppContext from '../context/AppContext';
import Cart from '../components/cart';

import {
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    CardImg
} from 'reactstrap';

const GET_RESTO_MENUS = gql `
    query($id: ID!) {
        restaurant(id: $id) {
            id
            name
            menus {
                id
                name
                desc
                price
                img {
                    url
                }
            }
        }
    }
`;
function renderMenus(restaurant, appContext){
    console.log( restaurant.menus );
    return (
        restaurant.menus.map((res) =>
            <Col xs="6" sm="4" style={{ padding: 2}} key={res.id}>
                <Card>
                    <CardImg 
                        top={true}
                        style={{height:250}}
                        src={`${process.env.NEXT_PUBLIC_API_URL}${res.img.url}`}
                        />
                    <CardBody>
                        <CardTitle>{res.name}</CardTitle>
                        <CardText>{res.desc}</CardText>
                    </CardBody>
                    <div className="card-footer">
                        <Button outline color="primary" onClick={() => appContext.addItem(res)}>
                            + Add To Cart
                        </Button>

                        <style jsx>
                            {`
                            a {
                                color: white;
                            }
                            a:link {
                                text-decoration: none;
                                color: white;
                            }
                            .container-fluid {
                                margin-bottom: 30px;
                            }
                            .btn-outline-primary {
                                color: #007bff !important;
                            }
                            a:hover {
                                color: white !important;
                            }
                            `}
                        </style>
                    </div>
                </Card>

            </Col>
        )
    );
}

function Resto() {
    const appContext = useContext(AppContext);
    const router = useRouter();
    const{ loading, error, data } = useQuery(GET_RESTO_MENUS, {
        variables: {id: router.query.id},
    });

    if (error) return "Error Loading Menus";
    if (loading) return <h2>Loading ... </h2>;
    if (data.restaurant) {
        const { restaurant } = data;
        return (
            <>
                <h1>{restaurant.name}</h1>
                <Row>
                    {
                        renderMenus(restaurant, appContext)
                    }
                     <Col xs="3" style={{ padding: 0 }}>
                        <div>
                            <Cart />
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
    return <h1>Add Dishes</h1>;
}

export default Resto;
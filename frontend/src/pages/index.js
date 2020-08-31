import React, { useState } from 'react';
import { 
    Row,
    Col,
    Input,
    InputGroup,
    InputGroupAddon,
} from 'reactstrap';
import ListResto from '../components/listresto';

function Home() {
    const [ query, updateQuery ] = useState("");
    return (
        <div className="container-fluid">
            <Row>
                <Col>
                    <div className="search">
                        <InputGroup>
                            <InputGroupAddon addonType="append">
                                Search
                            </InputGroupAddon>
                            <Input 
                                onChange={e => updateQuery(e.target.value.toLowerCase())} 
                                value={query}
                            />
                        </InputGroup>
                    </div>
                </Col>
            </Row>
            <ListResto search={query} />
            <style jsx>
                {
                    `
                    .search {
                        margin: 10px;
                        width: 70%;
                    }
                    `
                }
            </style>
        </div>
    )
}

export default Home;
import React, {Component} from "react";
import {Card, CardContent, CardHeader, Divider, Typography} from "@material-ui/core";
import './Projects.css'
import {Link} from "react-router-dom";

class ProjectCard extends Component {
    render() {
        return (
            <div className="projectCard">
                <Card className="projectCard">
                    <CardHeader
                        title={this.props.name}
                        subheader={'Project manager: ' + this.props.managerName}
                        titleTypographyProps={
                            {
                                align: "left",
                                variant: "h5",
                                component: Link,
                                to: '/project/' + this.props.id
                            }
                        }
                        subheaderTypographyProps={
                            {
                                align: 'left',
                                component: Link,
                                to: '/user/'
                            }
                        }

                    />
                    <Divider/>
                    <CardContent>
                        <Typography align='left'>
                            {this.props.description}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default ProjectCard
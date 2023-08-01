import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@ellucian/react-design-system/core/styles';
import {
    Table,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Pagination,
    TableFooter,
    TableHead,
    Skeleton
} from '@ellucian/react-design-system/core';
import { widthFluid } from '@ellucian/react-design-system/core/styles/tokens';
import { Typography } from '@mui/material';
import axios from 'axios';

const customId = 'CustomPaginationActionsTable';

const styles = theme => ({
    root: {
        width: widthFluid,
        marginTop: theme.spacing(3),
    },
    table: {
        minWidth: 500,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
    filterContainer: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    searchInput: {
        marginRight: theme.spacing(2),
        padding: theme.spacing(1),
        border: '1.5px solid',
        borderRadius: theme.spacing(1),
        width: '70%',
        height:'40px'
    },
    selectInput: {
        padding: theme.spacing(1),
        border: '1px solid #ccc',
        borderRadius: theme.spacing(1),
        background: '#fff',
        height:'30px'
    },
});

/**
 * Table with Pagination
 */
class CustomPaginationActionsTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            loading: true,
            error: false,
            page: 0,
            rowsPerPage: 10,
            searchQuery: '',
            selectedCategory: '',
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData = () => {
        axios
            .get('https://ytkqcmybo7.execute-api.eu-west-1.amazonaws.com/dev/getCourseData')
            .then(response => {
                this.setState({
                    data: response.data,
                    loading: false,
                });
            })
            .catch(error => {
                console.error(error);
                this.setState({
                    loading: false,
                    error: true,
                });
            });
        
    };
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    handleSearchChange = event => {
        this.setState({ searchQuery: event.target.value });
    };
    
    handleCategoryChange = event => {
        this.setState({ selectedCategory: event.target.value });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render() {
        const { classes } = this.props;
        const { data, loading, error, rowsPerPage, page, searchQuery, selectedCategory } = this.state;
        console.log(data);
        console.log(data.kiscourse);
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);
    
        // Apply search and category filters to the data
        let filteredData = data.filter(item =>
            item?.kiscourse?.kiscourseid.toLowerCase().includes(searchQuery.toLowerCase()) && 
            (selectedCategory === '' || item.nonextract.session === selectedCategory)
        );
        // const getPercent = (value) => {
        //     const strippedStr = value.replace(/%/g, '');
        //     const numberValue = parseFloat(strippedStr);
        //     return(numberValue); // Output: 5
        // };
        
        if (loading) {
            return <Skeleton rectangle={{ height: 106, width: 728, }} />;
        }

        if (error) {
            return <Typography>Error loading data.</Typography>;
        }

        return (
            <div id={`${customId}_Container`}>
                <div className={classes.tableWrapper}>
                    <div className={classes.filterContainer}>
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={this.handleSearchChange}
                            className={classes.searchInput}
                        />
                        <br/>
                        <Typography style={{ padding: '10px' }}> Session</Typography>
                        <select value={selectedCategory} onChange={this.handleCategoryChange} className={classes.selectInput}>
                            <option value="">All</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                            <option value="2023">2023</option>
                        </select>
                    </div>
                    <Paper className={classes.root}>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Course</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell >Duration</TableCell>
                                    {/* <TableCell>Variant</TableCell> */}
                                    <TableCell>Progress</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(n => {
                                    return (
                                        <TableRow key={n.kiscourseid}>
                                            <TableCell component="th" scope="row">
                                                {n?.kiscourse?.kiscourseid}
                                            </TableCell>
                                            <TableCell>{ n?.nonextract?.courseDesccourse}</TableCell>
                                            <TableCell>{n?.nonextract?.courseDuration}</TableCell>
                                            {/* <TableCell>{n.variant}</TableCell> */}
                                            <TableCell>
                                                {n?.nonextract?.progress}
                                                {/* <CircularProgress variant="determinate" value={getPercent(n?.nonextract?.progress)} size={20}/> */}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 48 * emptyRows }}>
                                        <TableCell colSpan={3} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <Pagination
                                        component="td"
                                        count={filteredData.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={this.handleChangePage}
                                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </div>
            </div>
        );
    }
}

CustomPaginationActionsTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomPaginationActionsTable);
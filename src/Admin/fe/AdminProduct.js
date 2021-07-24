import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import { useState } from "react";


function AdminProduct({ listProduct, onChageSwith, onClickDelete, register, handleSubmit, errors, onSubmitUpdateProduct, setPhotoOfProductUpdate, photoOfProductUpdate , upImg, listHangSx}) {
    const [productUpdate, setProductUpdate] = useState({})

    const onClickDataProductUpdate = (e, value) => {
        e.preventDefault()
        console.log(value)
        setProductUpdate(value)
        setPhotoOfProductUpdate(value.image)
    }

    const StyledTableCell = withStyles((theme) => ({
        head: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        body: {
            fontSize: 14,
        },
    }))(TableCell);
    const useStyles = makeStyles({
        table: {
            minWidth: 700,
        },
    });
    const classes = useStyles();
    const StyledTableRow = withStyles((theme) => ({
        root: {
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
        },
    }))(TableRow);

    const hsx = () => {
        try {
            const {name} = productUpdate.productype
            return name
        } catch (error) {
            
        }
    }

    return (
        <div>
            <div className="col-10 offset-1">
                <div className=" row mb-2 ">
                    <div className="col-1">
                        <select class="form-select" >
                            <option selected>All</option>
                            <option value="6">6</option>
                            <option value="12">12</option>
                            <option value="24">24</option>
                        </select>
                    </div>
                    <div className="col-2">
                        <select class="form-select" >
                            <option selected>Sắp xếp</option>
                            <option value="1">Giá giảm dần</option>
                            <option value="2">Giá tăng dần</option>
                        </select>
                    </div>
                    <div className="col-4">
                        <input className="form-control me-2" type="search" placeholder="Tên sản phẩm..." aria-label="Search" />
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>STT</StyledTableCell>
                                <StyledTableCell align="left">Tên SP</StyledTableCell>
                                <StyledTableCell align="left">Giá</StyledTableCell>
                                <StyledTableCell align="left">Trạng thái</StyledTableCell>
                                <StyledTableCell align="left">Hình ảnh</StyledTableCell>
                                <StyledTableCell align="left">Hãng sản xuất</StyledTableCell>
                                <StyledTableCell align="left" col="2">Thao tác</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                listProduct.map(function (value, index) {
                                    index++
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell >  {index} </StyledTableCell>
                                            <StyledTableCell align="left">{value.name}</StyledTableCell>
                                            <StyledTableCell align="left">{value.price}</StyledTableCell>
                                            <StyledTableCell align="left">
                                                <Switch
                                                    defaultChecked={value.available === 1 ? true : false}
                                                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                                                    onChange={(e) => { onChageSwith(e, value) }}
                                                /></StyledTableCell>
                                            <StyledTableCell align="left"><img src={value.image} alt={value.image} height={70} /></StyledTableCell>
                                            <StyledTableCell align="left">{value.productype.name}</StyledTableCell>
                                            <StyledTableCell align="left" col="2">
                                                <a href="/" className="cdn mr-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete"
                                                    onClick={(e) => { onClickDelete(e, value) }}
                                                >
                                                    <i class="fa fa-trash-o" aria-hidden="true"></i>
                                                </a>
                                                <a href="#" className="cdn" data-bs-toggle="modal" data-bs-target="#staticBackdrop"
                                                    onClick={(e) => { onClickDataProductUpdate(e, value) }}
                                                >
                                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                </a>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                            }

                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl" >
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Update Product</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <form onSubmit={handleSubmit(onSubmitUpdateProduct)}>
                            <div className="modal-body row">
                                <div className="col-5">
                                    <img className="img-max" src={photoOfProductUpdate}  alt={photoOfProductUpdate} />
                                    <input type="file" className="form-control-file" id="img" onChange={()=>{upImg()}}/>
                                </div>
                                <div className="col-7">
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input type="text" defaultValue={productUpdate.name} id="name" className="form-control" placeholder="Tên sản phẩm..."  />
                                    </div>
                                    <div className="form-group">
                                        <label>Giá</label>
                                        <input type="number" className="form-control" id="price" defaultValue={productUpdate.price} placeholder="Giá bán..." />
                                    </div>
                                    <div className="form-group">
                                        <label>Trạng thái</label>
                                        <select id="available" className="form-control">
                                            <option checked>{
                                                productUpdate.available === 1 ? "Còn hàng" : "Hết hàng"
                                            }</option>
                                            <option value={1}>Còn hàng</option>
                                            <option value={0}>Hết hàng</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label >Hãng sản xuất</label>
                                        <select id="productype" className="form-control">
                                            <option checked>{hsx()}</option>
                                            {
                                                listHangSx.map(function(value){
                                                    return(
                                                        <option value={value.id}>{value.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </div>
                                    <div class="form-group">
                                        <label >Mô tả sản phẩm</label>
                                        <textarea class="form-control" defaultValue={productUpdate.description} id="description" rows="3" placeholder="Mô tả sản phẩm..."></textarea>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-outline-danger" data-bs-dismiss="modal">Đóng</button>
                                <button type="submit" className="btn btn-outline-success">Cập nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default AdminProduct;
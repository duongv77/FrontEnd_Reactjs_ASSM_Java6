import {
    BrowserRouter as Router,
    Switch,
    Route,
    NavLink,
    Redirect,
} from "react-router-dom";
import ContactLogic from "./backend/ContactLogic";
import ShoppingCardLogic from "./User/ShoppingCardLogic";
import HistoryShoppingLogic from "./User/HistoryShoppingLogic";
import InfoLogic from "./backend/InfoLogic";
import LoginLogic from "./backend/LoginLogic";
import Product from "./backend/ProductLogic";
import FlowOrderLogic from "./backend/FlowOrderLogic";
import CreateUseLogic from "./backend/CreateUserLogic";
import ForgetPassWordLogic from "./backend/ForgetPassWordLogic";
import ChangePassWordLogic from "./backend/ChangePassWordLogic";
import NotFound from "./frontend/NotFound";
import ProductDetailLogic from "./backend/ProductDetailLogic";
import HomeLogic from "./backend/HomeLogic";
import AdminProductLogic from "./Admin/be/AdminProductLogic";
import AdminHome from "./Admin/fe/AdminHome";
import AdminUserLogic from "./Admin/be/AdminUserLogic";
import AdminSaleLogic from "./Admin/be/AdminSaleLogic";
import AdminSaleDetail from "./Admin/fe/AdminSaleDetail";
import AdminLayout from "./Layout/AdminLayout";
import WebsiteLayout from "./Layout/UserLayout";
import AdminRoute from "./auth/AdminRoute";
import AdminRoleLogic from "./Admin/be/AdminRoleLogic";


function Routers({
    listHangsx,
    SetUserLogin,
    setUser,
    showNotification,
    listProduct,
    user,
    setListHangsx,
    setListProduct,
}) {
    return (
        <Router>
            <Switch>
                <Route exact path="/admin/:path?/:path?/:path?">
                    <AdminLayout>
                        <Switch>
                            <AdminRoute exact path="/admin">
                                <AdminHome />
                            </AdminRoute>
                            <AdminRoute exact path="/admin/product">
                                <AdminProductLogic showNotification={showNotification} />
                            </AdminRoute>
                            <AdminRoute exact path="/admin/user">
                                <AdminUserLogic showNotification={showNotification}/>
                            </AdminRoute>
                            <AdminRoute exact path="/admin/user/role">
                                <AdminRoleLogic/>
                            </AdminRoute>
                            <AdminRoute exact path="/admin/sale">
                                <AdminSaleLogic showNotification={showNotification} />
                            </AdminRoute>
                            <AdminRoute exact path="/admin/sale/:id">
                                <AdminSaleDetail showNotification={showNotification} />
                            </AdminRoute>
                        </Switch>
                    </AdminLayout>
                </Route>
                <Route>
                    <WebsiteLayout user={user} setUser={setUser}>
                        <Switch>
                            <Route exact path="/">
                                <HomeLogic
                                    listHangsx={listHangsx}
                                    setListHangsx={setListHangsx}
                                    showNotification={showNotification}
                                    setListProduct={setListProduct}
                                />
                            </Route>
                            <Route exact path="/contact">
                                <ContactLogic />
                            </Route>
                            <Route
                                exact
                                path="/login"
                                render={() => {
                                    return localStorage.getItem("accessTokenLogin") !== null ? <Redirect to="/home" /> : <LoginLogic SetUserLogin={SetUserLogin}
                                    />
                                }}
                            >
                                <LoginLogic SetUserLogin={SetUserLogin} setUser={setUser} />
                            </Route>
                            <Route exact path="/createUser">
                                <CreateUseLogic showNotification={showNotification} />
                            </Route>
                            <Route exact path="/forgetpassword">
                                <ForgetPassWordLogic showNotification={showNotification} />
                            </Route>
                            <Route exact path="/changepw">
                                <ChangePassWordLogic showNotification={showNotification} />
                            </Route>
                            <Route
                                exact
                                path="/info"
                                render={() => {
                                    return localStorage.getItem("accessTokenLogin") === null ? (
                                        <Redirect to="/login" />
                                    ) : (
                                        <InfoLogic showNotification={showNotification} />
                                    );
                                }}
                            ></Route>
                            <Route
                                exact
                                path="/shoppingcard"
                                render={() => {
                                    return localStorage.getItem("accessTokenLogin") === null ? (
                                        <Redirect to="/login" />
                                    ) : (
                                        <ShoppingCardLogic showNotification={showNotification} />
                                    );
                                }}
                            ></Route>
                            <Route
                                exact
                                path="/historyshopping"
                                render={() => {
                                    return localStorage.getItem("accessTokenLogin") === null ? (
                                        <Redirect to="/login" />
                                    ) : (
                                        <HistoryShoppingLogic />
                                    );
                                }}
                            ></Route>
                            <Route
                                exact
                                path="/floworder"
                                render={() => {
                                    return localStorage.getItem("accessTokenLogin") === null ? (
                                        <Redirect to="/login" />
                                    ) : (
                                        <FlowOrderLogic />
                                    );
                                }}
                            ></Route>
                            <Route exact path="/product">
                                <Product
                                    listHangsx={listHangsx}
                                    listProduct={listProduct}
                                    showNotification={showNotification}
                                />
                            </Route>
                            <Route exact path="/productdetail/:id">
                                <ProductDetailLogic showNotification={showNotification} />
                            </Route>
                        </Switch>
                    </WebsiteLayout>
                </Route>

                <Route path="/*">
                    <NotFound />
                </Route>
            </Switch>
        </Router>
    );
}
export default Routers;

// const backendDomain  = 'http://localhost:8080'

const SummaryApi = {
    signUp : {
        url: 'http://localhost:8080/api/signup',
        method: 'post'
    },
    signIn : {
        url: 'http://localhost:8080/api/signin',
        method: 'post'
    },
    current_user : {
        url: 'http://localhost:8080/api/user-details',
        method: 'get'
    },
    logout_user : {
        url: 'http://localhost:8080/api/userLogout',
        method: 'get'
    },
    allUser : {
        url: 'http://localhost:8080/api/all-users',
        method: 'get'
    },
    updateUser: {
        url: 'http://localhost:8080/api/update-user',
        method: 'post'
    },
    uploadProduct : {
        url: 'http://localhost:8080/api/upload-product',
        method: 'post'
    },
    allProduct : {
        url: 'http://localhost:8080/api/get-product',
        method: 'get'
    },
    updateProduct : {
        url: 'http://localhost:8080/api/update-product',
        method: 'post'
    },
    categoryProduct : {
        url: 'http://localhost:8080/api/get-categoryProduct',
        method: 'get'
    },
    categoryWiseProduct : {
        url: 'http://localhost:8080/api/category-product',
        method: 'post'
    },
    productDetails : {
        url: 'http://localhost:8080/api/product-details',
        method: 'post'
    },
    addToCartProduct : {
        url: 'http://localhost:8080/api/addtocart',
        method: 'post'
    },
    addToCartProductCount : {
        url: 'http://localhost:8080/api/countAddToCartProduct',
        method: 'get'
    },
    addToCartProductView : {
        url: 'http://localhost:8080/api/view-cart-product',
        method: 'get'
    },
    updateCartProduct : {
        url : `http://localhost:8080/api/update-cart-product`,
        method : 'post'
    },
    deleteCartProduct : {
        url : `http://localhost:8080/api/delete-cart-product`,
        method : 'post'
    },
    searchProduct : {
        url : `http://localhost:8080/api/search`,
        method : 'get'
    },
    filterProduct : {
        url : `http://localhost:8080/api/filter-product`,
        method : 'post'
    }
    
}

export default SummaryApi
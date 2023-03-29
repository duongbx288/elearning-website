
export const handleCoursePrice = (course) => {
    var priceAfterDiscount = course.price;
    if (course.couponCode && course.couponCode !== '' && course.price) {
      course['discount'] = Math.round((course.price * 0.3) / 1000) * 1000;
      priceAfterDiscount = Math.round((course.price * 0.7) / 1000) * 1000;
    }
    return priceAfterDiscount;
};

export const handleDiscount = (course) => {
    var discount = 0;
    if (course.couponCode && course.couponCode !== '' && course.price) {
      discount = Math.round((course.price * 0.3) / 1000) * 1000;
    }
    return discount;
}

export const initSum = (cartData) => {
    var sum = 0;
    cartData.forEach((item) => {
        sum = sum + item.price;
    });
    return sum;
}

export const sumAllDiscount = (cartData) => {
    var discount = 0;
    cartData.forEach((item) => {
        if (item.couponCode && item.couponCode !== '' && item.price) {
            discount = discount + Math.round((item.price * 0.3) / 1000) * 1000;
        } 
    });
    return discount
}

export const totalPrice = (cartData) => {
    var sum = 0;
    cartData.forEach((item) => {
      if (item.couponCode && item.couponCode !== '' && item.price) {
        sum = sum + Math.round((item.price * 0.7) / 1000) * 1000;
      } else if (item.price) {
        sum = sum + item.price;
      }
    });
    return sum;
};


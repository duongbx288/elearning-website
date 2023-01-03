import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";
import React, { useEffect, useContext } from "react";
import { CartContext } from "../../../../../context/CartContext";

const PurchaseCard = ({courseId: number}) => {

    const cartContext = useContext(CartContext).cartInfo;

    useEffect(() => {

    }, []);

    return (
        <>
        <Card>
            <CardContent>
                <Typography>Text</Typography>
                <Button fullWidth>Try</Button>
                <Button fullWidth>Try</Button>
            </CardContent>
            <CardActions></CardActions>
        </Card>
        </>
    )
}

export default PurchaseCard;
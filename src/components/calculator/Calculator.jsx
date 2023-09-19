import React, { useState } from 'react'
import "../../css/Calculator.css"
import { Box, Button, InputLabel, InputAdornment, OutlinedInput, FormControl, Alert } from '@mui/material'
import TelegramIcon from '@mui/icons-material/Telegram';

const Calculator = () => {
    const [envios, setEnvios] = useState("")
    const [costoEnvio, setCostoEnvio] = useState(300)
    const [efectivo, setEfectivo] = useState("")
    const [totalEfectivo, setTotalEfectivo] = useState("")
    const [alert, setAlert] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if (envios.length > 0 && efectivo.length > 0 && totalEfectivo.length > 0) {

            const totalCostoEnvio = envios * costoEnvio

            const headerMsg = "*NiCKi's cierre de caja:*" + "\n\n";
            const msgEnvios = `Envios: ${envios}` + "\n"
            const msgCostoEnvio = `Total: $${totalCostoEnvio.toLocaleString("es-AR")}` + "\n\n"
            const msgEfectivo = `Efectivo: $${(efectivo - totalCostoEnvio).toLocaleString("es-AR")}` + "\n\n"
            const msgTotalEfectivo = `Caja: $${(totalEfectivo - totalCostoEnvio).toLocaleString("es-AR")}`

            const encodedText = encodeURIComponent(headerMsg + msgEnvios + msgCostoEnvio + msgEfectivo + msgTotalEfectivo);
            const url = `https://wa.me/?text=${encodedText}`;
            window.open(url);
            setAlert(false)
            setEnvios("")
            setCostoEnvio(300)
            setEfectivo("")
            setTotalEfectivo("")
        } else {
            setAlert(true)
        }
    }

    return (
        <div className='calculator-container'>
            <div className='calculator-title'>Calculadora de efectivo</div>
            <Box
                component="form"
                noValidate
                autoComplete="off"
                className='calculator-box'
                onSubmit={handleSubmit}
            >
                <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
                    <InputLabel htmlFor="outlined-adornment-amount" color="success">Nro de Envios</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        label="Nro de Envios"
                        color="success"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={envios}
                        onChange={(e) => setEnvios(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
                    <InputLabel htmlFor="outlined-adornment-amount" color="success">Costo de Envio</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Costo de Envio"
                        color="success"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={costoEnvio}
                        onChange={(e) => setCostoEnvio(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
                    <InputLabel htmlFor="outlined-adornment-amount" color="success">Efectivo del Cadete</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Efectivo del Cadete"
                        color="success"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={efectivo}
                        onChange={(e) => setEfectivo(e.target.value)}
                    />
                </FormControl>
                <FormControl fullWidth sx={{ m: 1, width: '35ch' }}>
                    <InputLabel htmlFor="outlined-adornment-amount" color="success">Total Efectivo</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                        label="Total Efectivo"
                        color="success"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={totalEfectivo}
                        onChange={(e) => setTotalEfectivo(e.target.value)}
                    />
                </FormControl>
                <Button
                    className='calculator-btn'
                    variant="contained"
                    type='submit'>
                    Enviar <TelegramIcon />
                </Button>
            </Box>
            {alert && <Alert sx={{ margin: 3 }} variant="outlined" severity="error">Debes rellenar todos los campos</Alert>}
        </div>
    )
}

export default Calculator

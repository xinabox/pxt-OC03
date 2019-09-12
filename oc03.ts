/**
 * OC03 Relay Out Low Voltage
 */
//% weight=99 color=#444444 icon="\uf011" block="OC03"
//% groups=['Functions', 'Optional']
namespace OC03 {
    // PCA9536 Register Definitions
    const PCA9554A_REG_INPUT_PORT = 0x00
    const PCA9554A_REG_OUTPUT_PORT = 0x01
    const PCA9554A_REG_POL_INVERSION = 0x02
    const PCA9554A_REG_CONFIG = 0x03
    const PCA9554A_CONF_OUTPUT = 0x00
    const PCA9554A_CONF_INPUT = 0xFF
    const PCA9554A_ALL_OUTPUTS_OFF = 0x00

    let OC03_I2C_ADDR = 0x38

    export enum OC03_ADDR {
        //% block="Off Off Off"
        Ax38 = 0x38,
        //% block="Off Off On"
        Ax39 = 0x39,
        //% block="Off On  Off"
        Ax3A = 0x3A,
        //% block="Off On  On"
        Ax3B = 0x3B,
        //% block="On  Off Off"
        Ax3C = 0x3C,
        //% block="On  Off On"
        Ax3D = 0x3D,
        //% block="On  On  Off"
        Ax3E = 0x3E,
        //% block="On  On  On"
        Ax3F = 0x3F
    }

    function writeState(state: number): void {
        let buf: Buffer = pins.createBuffer(2);
        buf[0] = PCA9554A_REG_OUTPUT_PORT;
        buf[1] = state;
        pins.i2cWriteBuffer(OC03_I2C_ADDR, buf, false);
    }

    function setModeOutput(): void {
        let buf: Buffer = pins.createBuffer(2);
        buf[0] = PCA9554A_REG_CONFIG;
        buf[1] = PCA9554A_CONF_OUTPUT;
        pins.i2cWriteBuffer(OC03_I2C_ADDR, buf, false);
    }

    function init(): void {
        setModeOutput();
        writeState(0x00);
    }

    /**
    * Used to set an alternative address of the OC03
    * @param chipAddress [72-80] The I2C address of your PCA9536; eg: 72
    */
    //% blockId="setAddress" block="OC03 set address %OC03_ADDR"
    //% weight=99
    //% group="Optional"
    export function setAddress(OC03_ADDR: OC03_ADDR = 1): void {
        OC03_I2C_ADDR = OC03_ADDR;
    }

    /**
    * Turn the relay on or off
    * @param state the state of the output channel   
	*/
    //% blockId="ToggleOnOff" block="OC03 turn %on"
    //% weight=90 blockGap=8
    //% on.shadow="toggleOnOff"
    //% group="Functions"
    export function setState(on: boolean): void {
        if (on) {
            writeState(0x01);
        } else {
            writeState(0x00);
        }
    }
    init();
}

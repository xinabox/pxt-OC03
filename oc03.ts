/**
 * OC03 Relay Out Low Voltage
 */
//% weight=99 color=#000000 icon="\uf205" block="OC03"
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
        Default = 0x38,
        A0 = 0x39,
        A1 = 0x3A,
        A0_A1 = 0x3B,
        A0_A2 = 0x3D,
        A1_A2 = 0x3E,
        A0_A1_A2 = 0x3F
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

    /**
    * Used to set the Alternative address of the OC03
    * @param chipAddress [72-80] The I2C address of your PCA9536; eg: 72
    */
    //% blockId="setAddress" block="set OC03 address %OC03_ADDR"
    //% weight=99
    export function setAddress(OC03_ADDR: OC03_ADDR = 1): void {
        OC03_I2C_ADDR = OC03_ADDR;
    }

    /**
    * OC03 Init, used to reset the chip and switch all outputs low
    * @param state the state of the output channel
 	*/
    //% block"%on=toggleOnOff"
    //% weight=90
    export function init(state: boolean): void {
        setModeOutput();
        if (state) {
            writeState(0x01);
        } else {
            writeState(0x00);
        }
    }

    /**
    * OC03 set the state of the output channel
    * @param state the state of the output channel   
	*/
    //% block"%on=toggleOnOff" block="set device ouftput state %on"
    //% weight=90
    export function setState(on: boolean): void {
        if (on) {
            writeState(0x01);
        } else {
            writeState(0x00);
        }
    }
}

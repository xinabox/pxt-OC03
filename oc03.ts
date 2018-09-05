/**
 * OC03 Relay Out Low Voltage
 */
//% weight=99 color=#9F79EE icon="\uf240" block="OC03"
namespace OC03 {
    // PCA9536 Register Definitions
    const PCA9554A_I2C_ADDRESS = 0x38
    const PCA9554A_REG_INPUT_PORT = 0x00
    const PCA9554A_REG_OUTPUT_PORT = 0x01	
    const PCA9554A_REG_POL_INVERSION = 0x02
    const PCA9554A_REG_CONFIG = 0x03
    const PCA9554A_CONF_OUTPUT = 0x00
    const PCA9554A_CONF_INPUT = 0xFF
    const PCA9554A_ALL_OUTPUTS_OFF = 0x00

    function writeState(state: number): void {
        let buf: Buffer = pins.createBuffer(2);
        buf[0] = PCA9554A_REG_OUTPUT_PORT;
        buf[1] = state;
        pins.i2cWriteBuffer(PCA9554A_I2C_ADDRESS, buf, false);
    }

    /**
 	* OC03 Init, used to reset the chip and switch all outputs low
 	*/
    //% block
    //% weight=90
    export function init(on: boolean): void {
        if(on) {
            writeState(0x01);
        } else {
            writeState(0x00);
        }
    }

    /**
     * Render a boolean as a on/off toggle
     */
    //% block="%on=toggleOnOff"
    export function onOff(on: boolean): boolean {
        return on;
    }

    /**
	* OC03 set the state of the output channel
	*/
    //% block
    //% weight=90
    export function setState(on: boolean): void {
        if(on) {
            writeState(0x01);
        } else {
            writeState(0x00);
        }
    }
}

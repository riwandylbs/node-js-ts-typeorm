import { AppDataSource } from "../data-source";
import { OneTimePass } from "../entity/OneTimePass";
import { generateRandomNum } from "../helper/helper";

export class OtpRepository {

    private otpRepository = AppDataSource.getRepository(OneTimePass)

    // request OTP
    async requestOTP(req) {
        const { phone } = req.body;
        console.log( phone )
        let expiryAt = Math.floor(Date.now() / 1000) + (60 * 30)
        
        const otpCode = await generateRandomNum(6)
        const status  = "available" 

        const otp = Object.assign(new OneTimePass(), {
            phone,
            otpCode,
            expiryAt,
            status
        })

        return this.otpRepository.save(otp)
    }

    // validate OTP
    async validateOTP(req) {
        const { otpCode, phone } = req.body;

        const otpData = await this.otpRepository.findOne({
            where: { phone, otpCode }
        })

        const nowTime = Date.now()
        let status = "used"
        if (parseInt( otpData.expiryAt ) * 1000 < nowTime) {
            status = "expired"
        }

        this.otpRepository.merge(otpData, { status: status})
        const result = await this.otpRepository.save(otpData);

        return result
    }
}
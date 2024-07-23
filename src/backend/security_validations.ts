import Joi from 'joi';

// Define the ticket schema
const ticketSchema = Joi.object({
  order_id: Joi.string().required(),
  status: Joi.string().valid('new', 'pending', 'completed').required(),
  operation: Joi.string().valid('sale', 'refund').required(),
  company_id: Joi.string().guid({ version: 'uuidv4' }).required(),
  event_id: Joi.string().guid({ version: 'uuidv4' }).required(),
  user: Joi.object({
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d+$/).required(),
  }).required(),
  sale: Joi.array().items(
    Joi.object({
      ticket: Joi.object({
        ticket_id: Joi.string().required(),
        ticket_status: Joi.string().valid('active', 'inactive').required(),
        ticket_section: Joi.string().required(),
        ticket_row: Joi.string().required(),
        ticket_seat: Joi.string().required(),
        ticket_description: Joi.string().allow(null, ''),
        ticket_qty: Joi.number().integer().min(1).required(),
        ticket_price: Joi.number().precision(2).required(),
        fees: Joi.array().items(
          Joi.object({
            fee_id: Joi.string().required(),
            fee_description: Joi.string().required(),
            fee_amount: Joi.number().precision(2).required(),
            taxes: Joi.object({
              tax_id: Joi.string().required(),
              tax_description: Joi.string().required(),
              tax_amount: Joi.number().precision(2).required(),
            }).required(),
          })
        ).required(),
        ticket_total: Joi.number().precision(2).required(),
      }).required()
    })
  ).required()
});

// Function to validate ticket data
const validateTicket = (data) => {
  return ticketSchema.validate(data);
};

// Export the schema and validation function
export { ticketSchema, validateTicket };
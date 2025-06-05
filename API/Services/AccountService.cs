using AutoMapper;
using DemoGym.Models;
using DemoGym.Entities;

namespace DemoGym.Services
{
    public class AccountService
    {
        private readonly IMapper _mapper;

        public AccountService(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<Member> RegisterMemberAsync(SignUpModel model)
        {
            // Ánh xạ SignUpModel sang Member
            var member = _mapper.Map<Member>(model);
             //await _memberRepository.AddAsync(member);

            return member;
        }
    }

}

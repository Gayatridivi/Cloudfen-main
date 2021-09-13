package com.cloudfen.home.service.impl;

import com.cloudfen.home.domain.UserAccount;
import com.cloudfen.home.repository.UserAccountRepository;
import com.cloudfen.home.service.UserAccountService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link UserAccount}.
 */
@Service
@Transactional
public class UserAccountServiceImpl implements UserAccountService {

    private final Logger log = LoggerFactory.getLogger(UserAccountServiceImpl.class);

    private final UserAccountRepository userAccountRepository;

    public UserAccountServiceImpl(UserAccountRepository userAccountRepository) {
        this.userAccountRepository = userAccountRepository;
    }

    @Override
    public UserAccount save(UserAccount userAccount) {
        log.debug("Request to save UserAccount : {}", userAccount);
        return userAccountRepository.save(userAccount);
    }

    @Override
    public Optional<UserAccount> partialUpdate(UserAccount userAccount) {
        log.debug("Request to partially update UserAccount : {}", userAccount);

        return userAccountRepository
            .findById(userAccount.getId())
            .map(
                existingUserAccount -> {
                    if (userAccount.getUserId() != null) {
                        existingUserAccount.setUserId(userAccount.getUserId());
                    }
                    if (userAccount.getFirstName() != null) {
                        existingUserAccount.setFirstName(userAccount.getFirstName());
                    }
                    if (userAccount.getLastName() != null) {
                        existingUserAccount.setLastName(userAccount.getLastName());
                    }
                    if (userAccount.getPhone() != null) {
                        existingUserAccount.setPhone(userAccount.getPhone());
                    }
                    if (userAccount.getPassport() != null) {
                        existingUserAccount.setPassport(userAccount.getPassport());
                    }
                    if (userAccount.getEmail() != null) {
                        existingUserAccount.setEmail(userAccount.getEmail());
                    }

                    return existingUserAccount;
                }
            )
            .map(userAccountRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UserAccount> findAll() {
        log.debug("Request to get all UserAccounts");
        return userAccountRepository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<UserAccount> findOne(Long id) {
        log.debug("Request to get UserAccount : {}", id);
        return userAccountRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete UserAccount : {}", id);
        userAccountRepository.deleteById(id);
    }
}

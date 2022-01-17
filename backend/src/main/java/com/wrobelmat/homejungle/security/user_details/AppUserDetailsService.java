package com.wrobelmat.homejungle.security.user_details;

import com.wrobelmat.homejungle.user.User;
import com.wrobelmat.homejungle.user.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AppUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public AppUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> user = userRepository.findByEmail(username); // email == username
        if (user.isPresent())
            return new AppUserDetails(user.get());
        else
            throw new UsernameNotFoundException(String.format("User with given e-mail: %s does not exist.", username));
    }
}
